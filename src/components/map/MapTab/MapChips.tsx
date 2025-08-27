'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import { CategoryChip } from '@/components/ui/CategoryChip';
import { Chip } from '@/components/ui/Chip/Chip';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import type { Swiper as SwiperClass } from 'swiper';
import { useMapStore } from '@/stores/useMapStore';
import { usePlansQuery } from '@/queries/plan/usePlansQuery';
import { useFoldersQuery } from '@/queries/folder/useFoldersQuery';
import { useFolderMemosQuery } from '@/queries/folder/useFolderMemosQuery';

function pickLatestByCreatedAt<T extends { createdAt: string }>(items: T[]): T | undefined {
  if (!items || items.length === 0) return undefined;
  return [...items].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )[0];
}

export function MapChips() {
  const planId = useMapStore((s) => s.planId);
  const setPlanId = useMapStore((s) => s.setPlanId);
  const folderId = useMapStore((s) => s.folderId);
  const setFolderId = useMapStore((s) => s.setFolderId);
  const didInit = useMapStore((s) => s.didInitPlanFromApi);
  const { data: plansFromApi } = usePlansQuery();
  const plans = plansFromApi ?? [];
  const effectivePlanId = useMemo(() => {
    if (didInit) return planId;
    return pickLatestByCreatedAt(plans)?.planId;
  }, [didInit, planId, plans]);
  const shouldQuery = Boolean(effectivePlanId);
  const { data: folders = [] } = useFoldersQuery(effectivePlanId as number, shouldQuery);
  const folderIdForQuery = folderId || (folders[0]?.folderId ?? null);
  const { data: memos, isSuccess: isMemosSuccess } = useFolderMemosQuery(
    folderIdForQuery as number,
    Boolean(folderIdForQuery)
  );
  const setMemosInFolder = useMapStore((s) => (s as any).setMemosInFolder);
  const memosInStore = useMapStore((s) => s.memosInFolder);

  const planOptions = useMemo(() => plans.map((p) => ({ id: p.planId, label: p.name })), [plans]);
  const selectedPlanId = planId;

  // 최초 렌더 시 스토어를 통해 한 번만 최신 계획으로 초기화 (Map/List 동기화)
  useEffect(() => {
    if (plansFromApi && plansFromApi.length > 0) {
      // 스토어 액션이 최초 1회만 반영하도록 내부에서 가드
      (useMapStore.getState().initPlanFromApi as any)(plansFromApi);
    }
  }, [plansFromApi]);

  // 폴더 변경되거나 쿼리 응답 오면 스토어 업데이트
  useEffect(() => {
    if (isMemosSuccess && memos && memos !== memosInStore) setMemosInFolder(memos);
  }, [isMemosSuccess, memos, memosInStore, setMemosInFolder]);

  // 스와이퍼/칩 포커스 제어를 위한 ref
  const folderSwiperRef = useRef<SwiperClass | null>(null);
  const chipRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  // 활성 폴더 칩으로 스크롤 및 포커스 이동
  useEffect(() => {
    if (!folders || folders.length === 0 || !folderId) return;
    const idx = folders.findIndex((f) => f.folderId === folderId);
    if (idx < 0) return;
    const t = setTimeout(() => {
      folderSwiperRef.current?.slideTo(Math.max(0, idx - 1), 350, true);
      chipRefs.current[folderId]?.focus({ preventScroll: true } as any);
    }, 0);
    return () => clearTimeout(t);
  }, [folders, folderId]);

  // planId가 바뀌거나 폴더 목록이 로드되면 활성 폴더가 목록에 없을 때 첫 폴더로 동기화
  useEffect(() => {
    if (folders.length === 0) return;
    const exists = folders.some((f) => f.folderId === folderId);
    if (!exists) {
      const latest = [...folders].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0];
      if (latest) setFolderId(latest.folderId);
    }
  }, [effectivePlanId, folders, folderId, setFolderId]);

  return (
    <div className="py-3 pl-6">
      <div className="flex items-center gap-2">
        {/* Plan 선택 */}
        <CategoryChip
          options={planOptions}
          value={selectedPlanId}
          onChange={(id) => setPlanId(Number(id))}
        />

        {/* Folder 선택 */}
        <Swiper
          modules={[FreeMode]}
          slidesPerView="auto"
          spaceBetween={8}
          freeMode
          slidesOffsetAfter={16}
          className="scrollbar-hidden w-full"
          onSwiper={(swiper) => {
            folderSwiperRef.current = swiper as SwiperClass;
          }}
        >
          {folders.map((f) => (
            <SwiperSlide key={f.folderId} style={{ width: 'auto' }}>
              <button
                type="button"
                ref={(el) => {
                  chipRefs.current[f.folderId] = el;
                }}
                tabIndex={f.folderId === folderId ? 0 : -1}
                aria-selected={f.folderId === folderId}
                onClick={() => {
                  setFolderId(f.folderId);
                }}
              >
                <Chip text={f.name} variant={f.folderId === folderId ? 'primary' : 'neutral'} />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
