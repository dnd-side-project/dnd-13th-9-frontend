import React, { useEffect, useMemo, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { FreeMode, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import { Icon } from '@/components/ui/Icon';
import { Body2xs, TitleM, TitleXs } from '@/components/ui/Typography';
import { useMapStore } from '@/stores/useMapStore';
import { useSelectedPlanName } from '@/hooks/useSelectedPlanName';
import { useFoldersQuery } from '@/queries/folder/useFoldersQuery';
import { usePlansQuery } from '@/queries/plan/usePlansQuery';
import { useCreateFolderMutation } from '@/queries/folder/useCreateFolderMutation';
import { useUpdateFolderNameMutation } from '@/queries/folder/useUpdateFolderNameMutation';
import { useDeleteFolderMutation } from '@/queries/folder/useDeleteFolderMutation';
import {
  MapListActionsMenu,
  MapListCreateModal,
  MapListRenameModal,
  MapListDeleteModal,
} from '@/components/map/ListTab/mapListOverlays';
import { useRouter } from 'next/navigation';
import ActiveFolder from '@assets/active-folder.svg';
import EmptyFolder from '@assets/empty-folder.svg';

// createdAt 기준으로 가장 최신 항목을 고르는 헬퍼
function pickLatestByCreatedAt<T extends { createdAt: string }>(items: T[]): T | undefined {
  if (!items || items.length === 0) return undefined;
  return [...items].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )[0];
}

export function FolderGrid() {
  const router = useRouter();
  const planId = useMapStore((s) => s.planId);
  const didInit = useMapStore((s) => s.didInitPlanFromApi);
  const { data: plansFromApi } = usePlansQuery();
  const plans = plansFromApi ?? [];
  // 초기 렌더: API에서 가장 최신 계획(planId) 사용, 이후에는 스토어의 planId 사용
  const effectivePlanId = useMemo(() => {
    if (didInit) return planId;
    return pickLatestByCreatedAt(plans)?.planId;
  }, [didInit, planId, plans]);
  // 유효한 planId가 있을 때만 폴더를 조회하여 /api/folder/1 같은 불필요한 호출 방지
  const shouldQuery = Boolean(effectivePlanId);
  const { data: folders = [] } = useFoldersQuery(effectivePlanId as number, shouldQuery);
  const activeFolderId = useMapStore((s) => s.folderId);
  const setFolderId = useMapStore((s) => s.setFolderId);
  const planName = useSelectedPlanName();

  // Folder CRUD hooks (planId 필요)
  const createFolder = useCreateFolderMutation(effectivePlanId as number);
  const updateFolder = useUpdateFolderNameMutation(effectivePlanId as number);
  const deleteFolder = useDeleteFolderMutation(effectivePlanId as number);

  // Actions menu & modals state
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [menuAnchor, setMenuAnchor] = React.useState<DOMRect | null>(null);
  const [targetFolderId, setTargetFolderId] = React.useState<number | null>(null);
  const [targetFolderName, setTargetFolderName] = React.useState<string>('');

  const [openCreate, setOpenCreate] = React.useState(false);
  const [openRename, setOpenRename] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // PlanGrid과 동일한 형태의 메뉴 오픈 헬퍼
  const openMenu = React.useCallback((folderId: number, anchorEl: Element, name: string) => {
    setMenuAnchor(anchorEl.getBoundingClientRect());
    setTargetFolderId(folderId);
    setTargetFolderName(name);
    setMenuOpen(true);
  }, []);
  const closeMenu = React.useCallback(() => setMenuOpen(false), []);

  const swiperRef = useRef<SwiperType | null>(null);
  const activeIndex = useMemo(
    () =>
      Math.max(
        0,
        folders.findIndex((f) => f.folderId === activeFolderId)
      ),
    [folders, activeFolderId]
  );

  // 폴더 목록 로드 후, 활성 폴더가 목록에 없으면 createdAt 최신 폴더로 동기화
  useEffect(() => {
    if (folders.length === 0) return;
    const exists = folders.some((f) => f.folderId === activeFolderId);
    if (!exists) {
      const latest = pickLatestByCreatedAt(folders);
      if (latest) setFolderId(latest.folderId);
    }
  }, [folders, activeFolderId, setFolderId]);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-5">
      <div className="flex h-8 items-center justify-between gap-2 px-6">
        <div className="flex items-center gap-2">
          <Icon name="folder" width={24} height={24} color="primary-50" />
          <TitleM>{planName}</TitleM>
        </div>
        <button
          className="bg-coolGray-20 text-primary-50 flex h-8 cursor-pointer items-center justify-center gap-1 rounded-full px-[10px] py-[6px]"
          onClick={() => setOpenCreate(true)}
        >
          <Icon name="add" color="primary-50" width={20} height={20} />
          <Body2xs className="text-primary-50 font-semibold">새 폴더</Body2xs>
        </button>
      </div>
      <div className="min-h-0 flex-1 px-6 pb-4">
        {folders.length === 0 ? (
          <div className="text-neutral-60 flex h-full items-center justify-center py-6 text-center">
            <div className="flex flex-col items-center gap-4">
              <EmptyFolder width={180} height={120} className="opacity-50" />
              <TitleXs className="text-neutral-60 text-[16px] font-medium">
                해당 계획에 폴더가 없어요
              </TitleXs>
            </div>
          </div>
        ) : (
          <Swiper
            direction="vertical"
            modules={[FreeMode, Mousewheel]}
            slidesPerView={'auto'}
            spaceBetween={10}
            freeMode
            mousewheel
            className="h-full cursor-pointer"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              if (activeIndex > 0) {
                swiper.slideTo(0, 0, false);
                setTimeout(() => swiper.slideTo(activeIndex, 500, true), 150);
              }
            }}
          >
            {folders.map((f, idx) => {
              const isActive = f.folderId === activeFolderId;
              return (
                <SwiperSlide key={f.folderId ?? `folder-idx-${idx}`} className="!h-auto">
                  <button
                    onClick={() => {
                      setFolderId(f.folderId);
                      swiperRef.current?.slideTo(Math.max(0, idx), 350, true);
                      const pid = effectivePlanId ?? planId;
                      router.push(`/map/folder/${f.folderId}?planId=${pid}`);
                    }}
                    className={`flex h-[72px] w-full cursor-pointer items-center justify-between rounded-[20px] p-6 text-left ${isActive ? 'bg-primary-50' : 'bg-coolGray-20'}`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        name="folder"
                        width={24}
                        height={24}
                        color={isActive ? 'white' : 'coolGray-50'}
                      />
                      <div className="flex items-center gap-[6px]">
                        <TitleXs className={isActive ? 'text-white' : 'text-coolGray-50'}>
                          {f.name}
                        </TitleXs>
                        <Body2xs
                          className={`flex h-[18px] w-[18px] items-center justify-center rounded-full text-[12px] font-semibold ${isActive ? 'bg-secondary-50 text-white' : 'bg-coolGray-50 text-coolGray-20'}`}
                        >
                          {typeof f.recordCount === 'number' ? f.recordCount : 0}
                        </Body2xs>
                      </div>
                    </div>
                    <Icon
                      name="more"
                      width={24}
                      height={24}
                      color={isActive ? 'white' : 'coolGray-50'}
                      onClick={(e) => {
                        e.stopPropagation();
                        openMenu(f.folderId, e.currentTarget as unknown as Element, f.name);
                      }}
                    />
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
        <MapListActionsMenu
          isOpen={menuOpen}
          anchorRect={menuAnchor}
          onClose={() => setMenuOpen(false)}
          onRename={() => {
            setMenuOpen(false);
            setOpenRename(true);
          }}
          onDelete={() => {
            setMenuOpen(false);
            setOpenDelete(true);
          }}
          renameLabel="폴더 이름 수정"
          deleteLabel="폴더 삭제"
          offsetX={30}
          offsetY={0}
        />
      </div>
      <MapListCreateModal
        isOpen={openCreate}
        onClose={() => setOpenCreate(false)}
        title="새 폴더 만들기"
        placeholder="폴더 이름"
        confirmLabel="만들기"
        loading={loading}
        onSubmit={async (name) => {
          if (!effectivePlanId) return;
          setLoading(true);
          try {
            await createFolder.mutateAsync({ name });
          } finally {
            setLoading(false);
            setOpenCreate(false);
          }
        }}
      />
      <MapListRenameModal
        isOpen={openRename}
        onClose={() => setOpenRename(false)}
        title="폴더 이름 수정"
        initialName={targetFolderName}
        loading={loading}
        onSubmit={async (name) => {
          if (!targetFolderId) return;
          setLoading(true);
          try {
            await updateFolder.mutateAsync({ folderId: targetFolderId, name });
          } finally {
            setLoading(false);
            setOpenRename(false);
          }
        }}
      />
      <MapListDeleteModal
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        title="폴더 삭제"
        label="폴더"
        name={targetFolderName}
        loading={loading}
        onConfirm={async () => {
          if (!targetFolderId) return;
          setLoading(true);
          try {
            await deleteFolder.mutateAsync({ folderId: targetFolderId });
          } finally {
            setLoading(false);
            setOpenDelete(false);
          }
        }}
      />
    </div>
  );
}
