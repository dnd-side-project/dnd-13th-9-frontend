import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import ActiveFolder from '@assets/active-folder.svg';
import DefaultFolder from '@assets/default-folder.svg';
import { Body2xs, TitleM, TitleXs } from '@/components/ui/Typography';
import { Icon } from '@/components/ui/Icon';
import { usePlansQuery } from '@/queries/plan/usePlansQuery';
import { useMapStore } from '@/stores/useMapStore';
import {
  MapListCreateModal,
  MapListRenameModal,
  MapListDeleteModal,
  MapListActionsMenu,
} from '@/components/map/ListTab/mapListOverlays';
import { useCreatePlanMutation } from '@/queries/plan/useCreatePlanMutation';
import { useUpdatePlanNameMutation } from '@/queries/plan/useUpdatePlanNameMutation';
import { useDeletePlanMutation } from '@/queries/plan/useDeletePlanMutation';

export function PlanGrid() {
  const { data: plansFromApi, isLoading } = usePlansQuery();
  const plans = useMemo(() => plansFromApi ?? [], [plansFromApi]);

  const activePlanId = useMapStore((s) => s.planId);
  const setPlanId = useMapStore((s) => s.setPlanId);

  const swiperRef = useRef<SwiperType | null>(null);
  const animatedOnceRef = useRef(false);
  const activeIndex = useMemo(
    () =>
      Math.max(
        0,
        plans.findIndex((p) => p.planId === activePlanId)
      ),
    [plans, activePlanId]
  );

  const [isCreateOpen, setCreateOpen] = useState(false);
  const createPlanMutation = useCreatePlanMutation();
  const updatePlanMutation = useUpdatePlanNameMutation();
  const deletePlanMutation = useDeletePlanMutation();

  const [menuPlanId, setMenuPlanId] = useState<number | null>(null);
  const [menuAnchor, setMenuAnchor] = useState<DOMRect | null>(null);
  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [actionPlanId, setActionPlanId] = useState<number | null>(null);

  useEffect(() => {
    if (!swiperRef.current) return;
    const idx = Math.max(
      0,
      plans.findIndex((p) => p.planId === activePlanId)
    );
    if (idx >= 0) swiperRef.current.slideTo(idx, 350, true);
  }, [activePlanId, plans]);

  // 최초 렌더 시 스토어를 통해 한 번만 최신 계획으로 초기화 (Map/List 동기화)
  useEffect(() => {
    if (plansFromApi && plansFromApi.length > 0) {
      // 스토어 액션이 최초 1회만 반영하도록 내부에서 가드
      (useMapStore.getState().initPlanFromApi as any)(plansFromApi);
    }
  }, [plansFromApi]);

  const toStatus = (e: any): number | undefined => e?.response?.status ?? e?.status;
  const errorMsg = (s?: number): string =>
    s === 400
      ? '폴더는 최대 10개까지 만들 수 있어요!'
      : s === 404
        ? '사용자를 찾을 수 없습니다.'
        : '계획 생성에 실패했습니다.';

  const handleCreatePlan = async (name: string) => {
    try {
      const created = await createPlanMutation.mutateAsync({ name });
      setPlanId(created.planId);
    } catch (e: any) {
      alert(errorMsg(toStatus(e)));
    } finally {
      setCreateOpen(false);
    }
  };

  const openMenu = (planId: number, target: EventTarget & Element) => {
    setMenuPlanId(planId);
    setMenuAnchor(target.getBoundingClientRect());
  };
  const closeMenu = () => setMenuPlanId(null);

  const actionPlan = React.useMemo(
    () => (actionPlanId ? plans.find((p) => p.planId === actionPlanId) : undefined),
    [plans, actionPlanId]
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex h-8 items-center justify-between gap-2 px-6">
        <TitleM>계획 폴더</TitleM>
        <button
          className="bg-coolGray-20 text-primary-50 flex h-8 cursor-pointer items-center justify-center gap-1 rounded-full px-[10px] py-[6px]"
          onClick={() => setCreateOpen(true)}
        >
          <Icon name="add" color="primary-50" width={20} height={20} />
          <Body2xs className="text-primary-50 font-semibold">새 계획</Body2xs>
        </button>
      </div>
      <div className="pl-4">
        {isLoading ? (
          <div className="text-neutral-60 px-6 py-3">계획을 불러오는 중...</div>
        ) : plans.length === 0 ? (
          <div className="text-neutral-60 px-6 py-3">계획이 없습니다. 새 계획을 추가하세요.</div>
        ) : null}
        <Swiper
          modules={[FreeMode]}
          slidesPerView={'auto'}
          spaceBetween={12}
          freeMode
          slidesOffsetAfter={16}
          className="scrollbar-hidden w-full"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            if (!animatedOnceRef.current && activeIndex > 0) {
              swiper.slideTo(0, 0, false);
              setTimeout(() => swiper.slideTo(activeIndex, 500, true), 150);
              animatedOnceRef.current = true;
            }
          }}
        >
          {plans.map((p, idx) => {
            const isActive = p.planId === activePlanId;
            const FolderSVG = isActive ? ActiveFolder : DefaultFolder;
            const slideKey = p.planId != null ? `plan-${p.planId}` : `plan-idx-${idx}`;
            return (
              <SwiperSlide key={slideKey} className="!w-[152px]">
                <div className="relative">
                  <button
                    onClick={() => {
                      setPlanId(p.planId);
                      swiperRef.current?.slideTo(Math.max(0, idx), 350, true);
                    }}
                    className="relative block"
                    aria-pressed={isActive}
                  >
                    <FolderSVG width={152} height={118} />
                    <div className="absolute inset-0 mt-[18px] flex cursor-pointer items-start justify-between py-[14px] pr-[10px] pl-[14px]">
                      <div className="flex gap-1">
                        <TitleXs
                          className={`line-clamp-2 max-w-[66px] flex-1 break-after-all text-left text-sm font-semibold whitespace-normal ${isActive ? 'text-white' : 'text-coolGray-50'}`}
                        >
                          {p.name}
                        </TitleXs>
                        <Body2xs
                          className={`flex h-[18px] w-[18px] items-center justify-center rounded-full text-xs font-semibold ${isActive ? 'bg-secondary-50 text-white' : 'bg-coolGray-50 text-coolGray-20'}`}
                        >
                          {p.folderCount ?? 0}
                        </Body2xs>
                      </div>
                      <Icon
                        name="more"
                        width={24}
                        height={24}
                        color={isActive ? 'white' : 'coolGray-50'}
                        onClick={(e) => {
                          e.stopPropagation();
                          openMenu(p.planId, e.currentTarget as unknown as Element);
                        }}
                      />
                    </div>
                  </button>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <MapListActionsMenu
        isOpen={!!menuPlanId}
        anchorRect={menuAnchor}
        onClose={closeMenu}
        onRename={() => {
          if (menuPlanId) setActionPlanId(menuPlanId);
          setRenameOpen(true);
        }}
        onDelete={() => {
          if (menuPlanId) setActionPlanId(menuPlanId);
          setDeleteOpen(true);
        }}
        renameLabel="계획 이름 수정"
        deleteLabel="삭제하기"
        offsetX={20}
      />

      <MapListCreateModal
        isOpen={isCreateOpen}
        onClose={() => setCreateOpen(false)}
        title="새 계획 만들기"
        placeholder="새 계획의 이름을 입력하세요."
        maxLength={10}
        confirmLabel="만들기"
        loading={createPlanMutation.isPending}
        onSubmit={handleCreatePlan}
      />

      <MapListRenameModal
        isOpen={renameOpen && !!actionPlan}
        onClose={() => setRenameOpen(false)}
        title="계획 이름 수정"
        initialName={actionPlan?.name ?? ''}
        loading={updatePlanMutation.isPending}
        onSubmit={async (name: string) => {
          if (!actionPlan) return;
          await updatePlanMutation.mutateAsync({ planId: actionPlan.planId, name });
          setRenameOpen(false);
          setActionPlanId(null);
        }}
      />

      <MapListDeleteModal
        isOpen={deleteOpen && !!actionPlan}
        onClose={() => setDeleteOpen(false)}
        title="삭제하기"
        name={actionPlan?.name}
        label="계획"
        loading={deletePlanMutation.isPending}
        onConfirm={async () => {
          if (!actionPlan) return;
          await deletePlanMutation.mutateAsync({ planId: actionPlan.planId });
          setDeleteOpen(false);
          setActionPlanId(null);
        }}
      />
    </div>
  );
}
