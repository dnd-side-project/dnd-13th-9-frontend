'use client';

import React, { useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useMapStore } from '@/stores/useMapStore';
import { Icon } from '@/components/ui/Icon';
import { MainLayout } from '@/components/layout';
import { Header } from '@/components/ui/Header';
import { TabBox, TabBoxList, TabBoxTrigger } from '@/components/ui/TabBox';
import { getPropertyDetail } from '@/components/map/mapData';
import { BodyS, BodyXl, TitleXs } from '@/components/ui/Typography';
import { getFeelingColor, getFeelingIconName } from '@/utils/feeling';
import { getContractLabel } from '@/utils/labels';
import useModal from '@/hooks/useModal';
import { Fab } from '@/components/ui/Fab';
import { MemoOverlay } from '@/components/map/Map/MemoOverlay';

export default function FolderDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const folderIdFromParams = Number(params?.id);

  const plans = useMapStore((s) => s.plans);
  const planId = useMapStore((s) => s.planId);
  const displayPlanId = useMapStore((s) => s.propsInFolder[0]?.planId ?? planId);
  const planName = useMemo(
    () => plans.find((p) => p.planId === displayPlanId)?.name ?? '계획',
    [plans, displayPlanId]
  );
  const folders = useMapStore((s) => s.folders);
  const setFolderId = useMapStore((s) => s.setFolderId);
  const propsInFolder = useMapStore((s) => s.propsInFolder);
  const setSelectedPropId = useMapStore((s) => s.setSelectedPropId);
  const { isOpen, openModal, closeModal } = useModal(false);

  React.useEffect(() => {
    if (!Number.isNaN(folderIdFromParams)) {
      setFolderId(folderIdFromParams);
    }
  }, [folderIdFromParams, setFolderId]);

  const currentFolder = useMemo(
    () => folders.find((f) => f.folderId === folderIdFromParams),
    [folders, folderIdFromParams]
  );

  return (
    <MainLayout className="flex min-h-0 flex-col">
      <Header
        left={
          <Icon
            name="arrowLeft"
            className="cursor-pointer"
            size={24}
            padding={10}
            onClick={() => router.push('/map?tab=list')}
          />
        }
        center={
          <TabBox defaultValue="list" className="fit-content">
            <TabBoxList className="fit-content">
              <TabBoxTrigger
                value="map"
                leadingIcon={<Icon name="map" size={18} />}
                onActivate={() => {
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

      <div className="min-h-0 grow overflow-auto px-6 py-3">
        <div className="flex items-center gap-2 text-sm text-black">
          <TitleXs>{planName ?? '계획'}</TitleXs>
          <BodyXl className="text-neutral-60">›</BodyXl>
          <BodyXl className="font-semibold text-black">{currentFolder?.name ?? '폴더'}</BodyXl>
        </div>

        <div className="mt-1 flex min-h-0 flex-col divide-y divide-black/5 rounded-xl bg-white">
          {propsInFolder.map((p) => {
            const detail = getPropertyDetail(p.propertyId);
            const feelingIcon = getFeelingIconName(p.feeling);
            const feelingColor = getFeelingColor(p.feeling);
            return (
              <button
                key={p.propertyId}
                onClick={() => {
                  setSelectedPropId(p.propertyId);
                  const href =
                    p.memoType === 'NEARBY'
                      ? `/map/nearby-memo/${p.propertyId}`
                      : `/map/house-memo/${p.propertyId}`;
                  router.push(href);
                }}
                className="flex cursor-pointer items-center gap-3 py-[18px] text-left"
              >
                {p.memoType === 'NEARBY' ? (
                  <>
                    <div className="bg-secondary-10 flex h-13 w-13 items-center justify-center rounded-2xl">
                      <Icon name="favorite" color="secondary" width={32} height={32} />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-center gap-1">
                        <TitleXs>{p.propertyName}</TitleXs>
                      </div>
                      <BodyS className="text-neutral-80 mt-1 line-clamp-1">{p.memo ?? '-'}</BodyS>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-coolGray-20 flex h-13 w-13 items-center justify-center rounded-2xl">
                      <Icon name="house" color="primary-50" width={32} height={32} />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-center gap-1">
                        <Icon
                          name={feelingIcon as any}
                          width={18}
                          height={18}
                          color={feelingColor}
                        />
                        <TitleXs>{p.propertyName}</TitleXs>
                      </div>
                      <BodyS className="text-neutral-80 mt-1 line-clamp-1">
                        {getContractLabel(p.contractType)}&nbsp;
                        <span>
                          {[
                            p.depositBig ? `${p.depositBig}억` : null,
                            p.depositSmall
                              ? `${p.depositSmall}${p.depositBig ? '만원' : ''}`
                              : null,
                          ]
                            .filter(Boolean)
                            .join(' ')}
                        </span>
                        /<span>{p.managementFee ? `${p.managementFee}` : ''}</span>
                      </BodyS>
                    </div>
                  </>
                )}
                <Icon name="more" color="coolGray-50" />
              </button>
            );
          })}
          {propsInFolder.length === 0 && (
            <div className="p-6 text-center text-sm text-black/50">
              해당 폴더에 매물이 없습니다.
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
    </MainLayout>
  );
}
