'use client';

import React, { useEffect, useMemo } from 'react';
import { CategoryChip } from '@/components/ui/CategoryChip';
import { Chip } from '@/components/ui/Chip/Chip';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import { useMapStore } from '@/stores/useMapStore';
import { usePlansQuery } from '@/queries/plan/usePlansQuery';

export function MapChips() {
  const plansInStore = useMapStore((s) => s.plans);
  const planId = useMapStore((s) => s.planId);
  const setPlanId = useMapStore((s) => s.setPlanId);
  const folders = useMapStore((s) => s.folders);
  const folderId = useMapStore((s) => s.folderId);
  const setFolderId = useMapStore((s) => s.setFolderId);
  const { data: plansFromApi } = usePlansQuery();

  const plans = plansFromApi ?? [];

  const planOptions = useMemo(() => plans.map((p) => ({ id: p.planId, label: p.name })), [plans]);
  const selectedPlanId = planId;

  // 최초 렌더 시 스토어를 통해 한 번만 최신 계획으로 초기화 (Map/List 동기화)
  useEffect(() => {
    if (plansFromApi && plansFromApi.length > 0) {
      // 스토어 액션이 최초 1회만 반영하도록 내부에서 가드
      (useMapStore.getState().initPlanFromApi as any)(plansFromApi);
    }
  }, [plansFromApi]);

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
        >
          {folders.map((f) => (
            <SwiperSlide key={f.folderId} style={{ width: 'auto' }}>
              <button
                type="button"
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
