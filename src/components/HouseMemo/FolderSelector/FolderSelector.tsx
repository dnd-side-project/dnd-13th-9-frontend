import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import { PlanGrid } from '@/components/map/ListTab/section/PlanGrid';

function pickLatestByCreatedAt<T extends { createdAt: string }>(items: T[]): T | undefined {
  if (!items || items.length === 0) return undefined;
  return [...items].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )[0];
}

interface FolderSelectorProps {
  selectedFolderId?: number;
  onFolderSelect: (folderId: number) => void;
  showCreateButton?: boolean;
  showActionsMenu?: boolean;
  showPlanGrid?: boolean;
}

export function FolderSelector({
  selectedFolderId,
  onFolderSelect,
  showCreateButton = true,
  showActionsMenu = true,
  showPlanGrid = true,
}: FolderSelectorProps) {
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
  const planName = useSelectedPlanName();

  // Folder CRUD hooks (planId 필요)
  const createFolder = useCreateFolderMutation(effectivePlanId as number);
  const updateFolder = useUpdateFolderNameMutation(effectivePlanId as number);
  const deleteFolder = useDeleteFolderMutation(effectivePlanId as number);

  // Actions menu & modals state
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<DOMRect | null>(null);
  const [targetFolderId, setTargetFolderId] = useState<number | null>(null);
  const [targetFolderName, setTargetFolderName] = useState<string>('');

  const [openCreate, setOpenCreate] = useState(false);
  const [openRename, setOpenRename] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  // PlanGrid과 동일한 형태의 메뉴 오픈 헬퍼
  const openMenu = React.useCallback((folderId: number, anchorEl: Element, name: string) => {
    setMenuAnchor(anchorEl.getBoundingClientRect());
    setTargetFolderId(folderId);
    setTargetFolderName(name);
    setMenuOpen(true);
  }, []);
  const closeMenu = React.useCallback(() => setMenuOpen(false), []);

  const swiperRef = useRef<SwiperType | null>(null);
  const activeIndex = useMemo(() => {
    if (!effectivePlanId) return 0;
    return Math.max(
      0,
      folders.findIndex((f) => f.folderId === selectedFolderId)
    );
  }, [folders, selectedFolderId, effectivePlanId]);

  // 폴더 목록 로드 후, 선택된 폴더가 목록에 없으면 createdAt 최신 폴더로 동기화
  useEffect(() => {
    if (!effectivePlanId || folders.length === 0) return;
    const exists = folders.some((f) => f.folderId === selectedFolderId);
    if (!exists) {
      const latest = pickLatestByCreatedAt(folders);
      if (latest) onFolderSelect(latest.folderId);
    }
  }, [folders, selectedFolderId, onFolderSelect, effectivePlanId]);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-5">
      {/* 계획 선택 영역 */}
      {showPlanGrid && <PlanGrid />}

      {/* 폴더 영역 헤더 */}
      <div className="flex h-8 items-center justify-between gap-2 px-6">
        <div className="flex items-center gap-2">
          <Icon name="folder" width={24} height={24} color="primary-50" />
          <TitleM>{planName}</TitleM>
        </div>
        {showCreateButton && (
          <button
            className={`flex h-8 cursor-pointer items-center justify-center gap-1 rounded-full px-[10px] py-[6px] ${
              effectivePlanId
                ? 'bg-coolGray-20 text-primary-50'
                : 'bg-coolGray-30 text-coolGray-50 cursor-not-allowed'
            }`}
            onClick={() => effectivePlanId && setOpenCreate(true)}
            disabled={!effectivePlanId}
            title={!effectivePlanId ? '계획을 먼저 선택해주세요' : '새 폴더 만들기'}
          >
            <Icon
              name="add"
              color={effectivePlanId ? 'primary-50' : 'coolGray-50'}
              width={20}
              height={20}
            />
            <Body2xs
              className={`font-semibold ${effectivePlanId ? 'text-primary-50' : 'text-coolGray-50'}`}
            >
              새 폴더
            </Body2xs>
          </button>
        )}
      </div>
      <div className="min-h-0 flex-1 px-6 pb-4">
        {!effectivePlanId ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-coolGray-50 text-center">
              <Icon
                name="folder"
                width={48}
                height={48}
                color="coolGray-50"
                className="mx-auto mb-2"
              />
              <Body2xs>계획을 먼저 선택해주세요</Body2xs>
            </div>
          </div>
        ) : folders.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-coolGray-50 text-center">
              <Icon
                name="folder"
                width={48}
                height={48}
                color="coolGray-50"
                className="mx-auto mb-2"
              />
              <Body2xs>폴더가 없습니다</Body2xs>
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
              const isActive = f.folderId === selectedFolderId;
              return (
                <SwiperSlide key={f.folderId ?? `folder-idx-${idx}`} className="!h-auto">
                  <button
                    onClick={() => {
                      onFolderSelect(f.folderId);
                      swiperRef.current?.slideTo(Math.max(0, idx), 350, true);
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
                    {showActionsMenu && (
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
                    )}
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}

        {showActionsMenu && (
          <>
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
          </>
        )}
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
            setOpenCreate(false);
          } catch (error) {
            console.error('Failed to create folder:', error);
          } finally {
            setLoading(false);
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
          if (!targetFolderId || !effectivePlanId) return;
          setLoading(true);
          try {
            await updateFolder.mutateAsync({ folderId: targetFolderId, name });
            setOpenRename(false);
          } catch (error) {
            console.error('Failed to update folder:', error);
          } finally {
            setLoading(false);
          }
        }}
      />

      <MapListDeleteModal
        isOpen={openDelete}
        onClose={() => setOpenDelete(false)}
        title="폴더 삭제"
        description={`"${targetFolderName}" 폴더를 삭제하시겠습니까?`}
        confirmLabel="삭제"
        loading={loading}
        onSubmit={async () => {
          if (!targetFolderId || !effectivePlanId) return;
          setLoading(true);
          try {
            await deleteFolder.mutateAsync({ folderId: targetFolderId });
            setOpenDelete(false);

            if (targetFolderId === selectedFolderId) {
              const remainingFolders = folders.filter((f) => f.folderId !== targetFolderId);
              const latest = pickLatestByCreatedAt(remainingFolders);
              if (latest) onFolderSelect(latest.folderId);
            }
          } catch (error) {
            console.error('Failed to delete folder:', error);
          } finally {
            setLoading(false);
          }
        }}
      />
    </div>
  );
}
