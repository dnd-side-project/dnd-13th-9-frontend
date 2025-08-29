'use client';

import React, { useMemo } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useMapStore } from '@/stores/useMapStore';
import { Icon } from '@/components/ui/Icon';
import { MainLayout } from '@/components/layout';
import { Header } from '@/components/ui/Header';
import { TabBox, TabBoxList, TabBoxTrigger } from '@/components/ui/TabBox';
import { BodyS, BodyXl, TitleS, TitleXs } from '@/components/ui/Typography';
import { getFeelingColor, getFeelingIconName } from '@/utils/feeling';
import { getContractLabel } from '@/utils/labels';
import useModal from '@/hooks/useModal';
import { Fab } from '@/components/ui/Fab';
import { MemoOverlay } from '@/components/map/Map/MemoOverlay';
import { useSelectedPlanName } from '@/hooks/useSelectedPlanName';
import { usePlansQuery } from '@/queries/plan/usePlansQuery';
import { useFoldersQuery } from '@/queries/folder/useFoldersQuery';
import { useFolderMemosQuery } from '@/queries/folder/useFolderMemosQuery';
import { useDeleteNearbyMemo } from '@/queries/nearbyMemo/useDeleteNearbyMemo';
import { useDeleteHouseMemo } from '@/queries/houseMemo/useDeleteHouseMemo';
import { DeleteActionsMenu } from '@/components/ui/DeleteActionsMenu';
import { DeleteDataModal } from '@/components/ui/DeleteDataModal';
import IcoEmpty from '@assets/ico-empty.svg';
import { Loading } from '@/components/ui/Loading';

export default function FolderDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const folderIdFromParams = Number(params?.id);

  const planId = useMapStore((s) => s.planId);
  const didInit = useMapStore((s) => s.didInitPlanFromApi);
  const storeFolders = useMapStore((s) => s.folders);
  const planName = useSelectedPlanName();
  const setPlanId = useMapStore((s) => s.setPlanId);
  const { data: plansFromApi, isLoading: isLoadingPlans } = usePlansQuery();
  const plans = plansFromApi ?? [];
  const effectivePlanId = useMemo(() => {
    if (didInit) return planId;
    return [...plans].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0]?.planId;
  }, [didInit, planId, plans]);
  const shouldQuery = Boolean(effectivePlanId);
  const {
    data: foldersFromApi = [],
    isLoading: isLoadingFolders,
    isFetching: isFetchingFolders,
  } = useFoldersQuery(effectivePlanId as number, shouldQuery);
  const setFolderId = useMapStore((s) => s.setFolderId);
  const memosInFolder = useMapStore((s) => s.memosInFolder);
  const setMemosInFolder = useMapStore((s) => (s as any).setMemosInFolder);
  const setSelectedMemoId = useMapStore((s) => (s as any).setSelectedMemoId);
  const { isOpen, openModal, closeModal } = useModal(false);

  const deleteNearbyMemo = useDeleteNearbyMemo();
  const deleteHouseMemo = useDeleteHouseMemo();

  const [menuAnchor, setMenuAnchor] = React.useState<DOMRect | null>(null);
  const [menuMemoId, setMenuMemoId] = React.useState<string | null>(null);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [actionMemoId, setActionMemoId] = React.useState<string | null>(null);

  const placeTagToIcon: Record<string, any> = {
    ADVANTAGE: 'mapNearbyGood',
    DISADVANTAGE: 'mapNearbyBad',
    CONVENIENCE: 'mapNearbyConvenience',
    TRANSPORTATION: 'mapNearbyTraffic',
    SECURITY: 'mapNearbySecurity',
    NOISE: 'mapNearbyNoise',
  };

  const openMenu = (event: React.MouseEvent, memoId: string) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuAnchor(rect);
    setMenuMemoId(memoId);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
    setMenuMemoId(null);
  };

  React.useEffect(() => {
    if (!Number.isNaN(folderIdFromParams)) {
      setFolderId(folderIdFromParams);
    }
  }, [folderIdFromParams, setFolderId]);

  // URL에 planId가 있으면 스토어에 반영하여 새로고침 시 상태 유지
  React.useEffect(() => {
    const pid = Number(searchParams.get('planId'));
    if (!Number.isNaN(pid) && pid > 0) {
      setPlanId(pid);
    }
  }, [searchParams, setPlanId]);

  const {
    data: memos,
    isFetching: isFetchingMemos,
    isLoading: isLoadingMemos,
    isSuccess: isMemosSuccess,
  } = useFolderMemosQuery(folderIdFromParams, true);

  React.useEffect(() => {
    if (isMemosSuccess && memos && useMapStore.getState().memosInFolder !== memos) {
      setMemosInFolder(memos);
    }
  }, [isMemosSuccess, memos, setMemosInFolder]);

  const currentFolderName = useMemo(() => {
    const fromApi = foldersFromApi.find((f) => f.folderId === folderIdFromParams)?.name;
    if (fromApi) return fromApi;
    const fromStore = storeFolders.find((f) => f.folderId === folderIdFromParams)?.name;
    return fromStore ?? '폴더';
  }, [foldersFromApi, storeFolders, folderIdFromParams]);

  const isLoading =
    isLoadingPlans ||
    (shouldQuery && (isLoadingFolders || isFetchingFolders)) ||
    isLoadingMemos ||
    isFetchingMemos;

  // 쿼리 성공 시에는 쿼리 결과를 바로 사용해 스토어 반영 전 깜빡임 방지
  const visibleMemos = useMemo(
    () => (isMemosSuccess ? (memos ?? []) : memosInFolder),
    [isMemosSuccess, memos, memosInFolder]
  );

  return (
    <MainLayout className="flex min-h-0 flex-col">
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/60 backdrop-blur-[2px]">
          <Loading size="large" />
        </div>
      )}
      <Header
        left={
          <Icon
            name="arrowLeft"
            className="cursor-pointer"
            size={24}
            onClick={() => {
              const pid = effectivePlanId ?? planId;
              const fid = folderIdFromParams;
              const qs = new URLSearchParams({ tab: 'list' });
              if (pid) qs.set('planId', String(pid));
              if (!Number.isNaN(fid) && fid > 0) qs.set('folderId', String(fid));
              router.push(`/map?${qs.toString()}`);
            }}
          />
        }
        center={
          <TabBox defaultValue="list" className="fit-content">
            <TabBoxList className="fit-content">
              <TabBoxTrigger
                value="map"
                leadingIcon={<Icon name="map" size={18} />}
                onActivate={() => {
                  if (effectivePlanId) setPlanId(effectivePlanId as number);
                  if (!Number.isNaN(folderIdFromParams)) setFolderId(folderIdFromParams);
                  router.push('/map?tab=map');
                  return true;
                }}
              >
                맵
              </TabBoxTrigger>
              <TabBoxTrigger value="list" leadingIcon={<Icon name="list" size={18} />}>
                리스트
              </TabBoxTrigger>
            </TabBoxList>
          </TabBox>
        }
      />

      <div className="min-h-0 grow overflow-hidden px-6 py-3">
        <div className="flex items-center gap-2 text-sm text-black">
          <TitleXs>{planName ?? '계획'}</TitleXs>
          <BodyXl className="text-neutral-60">›</BodyXl>
          <BodyXl className="font-semibold text-black">{currentFolderName}</BodyXl>
        </div>

        <div className="scrollbar-hidden mt-1 flex h-full flex-col divide-y divide-black/5 overflow-y-auto rounded-xl bg-white">
          {isLoading && (
            <Loading
              className="flex h-full items-center justify-center"
              size="large"
              color="primary"
            />
          )}
          {!isLoading &&
            isMemosSuccess &&
            visibleMemos.map((m) => {
              const feelingIcon = m.feeling ? getFeelingIconName(m.feeling as any) : 'soSo';
              const feelingColor = m.feeling ? getFeelingColor(m.feeling) : 'neutral';
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedMemoId(m.id);
                    const href =
                      m.type === 'NEARBY'
                        ? `/map/nearby-memo/${m.id.replace('near_', '')}`
                        : `/map/house-memo/${m.id.replace('prop_', '')}`;
                    router.push(href);
                  }}
                  className="flex cursor-pointer items-center gap-3 py-[18px] text-left"
                >
                  {m.type === 'NEARBY' ? (
                    <>
                      <div className="bg-secondary-10 flex h-13 w-13 items-center justify-center rounded-2xl">
                        <Icon
                          name={(placeTagToIcon[m.tag ?? ''] ?? 'mapNearbyGood') as any}
                          width={32}
                          height={32}
                          color="secondary"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-center gap-1">
                          <TitleXs>{m.title}</TitleXs>
                        </div>
                        <BodyS className="text-neutral-80 mt-1 line-clamp-1">{m.memo ?? '-'}</BodyS>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-coolGray-20 flex h-13 w-13 items-center justify-center rounded-2xl">
                        <Icon name="mapHouse" color="primary-50" width={32} height={32} />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-center gap-1">
                          <Icon
                            name={feelingIcon as any}
                            width={18}
                            height={18}
                            color={feelingColor}
                          />
                          <TitleXs>{m.title}</TitleXs>
                        </div>
                        <BodyS className="text-neutral-80 mt-1 line-clamp-1">
                          {getContractLabel(m.contractType as any)}&nbsp;
                          <span>
                            {[
                              m.depositBig ? `${m.depositBig}억` : null,
                              m.depositSmall
                                ? `${m.depositSmall}${m.depositBig ? '만원' : ''}`
                                : null,
                            ]
                              .filter(Boolean)
                              .join(' ')}
                          </span>
                          <span>{m.managementFee ? `/ ${m.managementFee}` : ''}</span>
                        </BodyS>
                      </div>
                    </>
                  )}
                  <Icon
                    name="more"
                    color="coolGray-50"
                    onClick={(e) => openMenu(e, m.id)}
                    className="cursor-pointer"
                  />
                </button>
              );
            })}
          {!isLoading && isMemosSuccess && visibleMemos.length === 0 && (
            <div className="mb-[168px] flex h-full flex-col items-center justify-center gap-6 text-center text-sm text-black/50">
              <IcoEmpty className="mr-20 h-[180px] w-[180px] opacity-50" />
              <TitleXs className="text-neutral-60 text-[16px] font-medium">
                해당 폴더에 매물이 없어요
              </TitleXs>
            </div>
          )}
        </div>
      </div>
      {!isOpen && (
        <Fab
          label="메모 하기"
          icon="locationAdd"
          onClick={openModal}
          className="right-[18px] bottom-12 z-10"
        />
      )}

      <MemoOverlay isOpen={isOpen} onClose={closeModal} portalSelector="#main-layout" />

      <DeleteActionsMenu
        isOpen={!!menuMemoId}
        anchorRect={menuAnchor}
        onClose={closeMenu}
        onDelete={() => {
          if (menuMemoId) setActionMemoId(menuMemoId);
          setDeleteOpen(true);
        }}
        deleteLabel="삭제하기"
        offsetX={20}
      />

      <DeleteDataModal
        isOpen={deleteOpen}
        closeModal={() => setDeleteOpen(false)}
        title="이 메모를"
        confirmText="삭제"
        onConfirm={() => {
          if (actionMemoId) {
            const memoType = actionMemoId.startsWith('near_') ? 'NEARBY' : 'HOUSE';
            const memoId = actionMemoId.replace(/^(near_|prop_)/, '');

            if (memoType === 'NEARBY') {
              deleteNearbyMemo.mutate(memoId);
            } else {
              deleteHouseMemo.mutate(memoId);
            }

            setDeleteOpen(false);
            setActionMemoId(null);
            closeMenu();
          }
        }}
      />
    </MainLayout>
  );
}
