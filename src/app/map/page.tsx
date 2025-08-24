'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MainLayout } from '@/components/layout';
import { TabBox, TabBoxList, TabBoxTrigger, TabBoxContent } from '@/components/ui/TabBox';
import { MapChips } from '@/components/map/Map/MapChips';
import { KakaoMap } from '@/components/map/Map/KakaoMap';
import { MapList } from '@/components/map/List/MapList';
import { Icon } from '@/components/ui/Icon/Icon';
import { Header } from '@/components/ui/Header';
import { useMapSelection } from '@/hooks/useMapSelection';
import { useMapStore } from '@/stores/useMapStore';

export default function MapPage() {
  const { markers, selectedProp } = useMapSelection();
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') === 'list' ? 'list' : 'map';
  const router = useRouter();
  const setPlanId = useMapStore((s) => s.setPlanId);
  const setFolderId = useMapStore((s) => s.setFolderId);
  const currentPlanId = useMapStore((s) => s.planId);
  const currentFolderId = useMapStore((s) => s.folderId);

  const handleListTabActivate = React.useCallback(() => {
    if (selectedProp) {
      setPlanId(selectedProp.planId);
      setFolderId(selectedProp.folderId);
      router.push(`/map/folder/${selectedProp.folderId}`);
      return true;
    }
    if (currentFolderId) {
      setPlanId(currentPlanId);
      setFolderId(currentFolderId);
      router.push(`/map/folder/${currentFolderId}`);
      return true;
    }
    return false;
  }, [selectedProp, setPlanId, setFolderId, router, currentPlanId, currentFolderId]);

  return (
    <MainLayout>
      <TabBox defaultValue={defaultTab} className="flex min-h-0 grow flex-col">
        <Header
          center={
            <TabBoxList className="fit-content">
              <TabBoxTrigger value="map" leadingIcon={<Icon name="map" size={18} />}>
                맵
              </TabBoxTrigger>
              <TabBoxTrigger
                value="list"
                leadingIcon={<Icon name="list" size={18} />}
                onActivate={handleListTabActivate}
              >
                리스트
              </TabBoxTrigger>
            </TabBoxList>
          }
          rightIconName="search"
          rightAction={() => alert('right action clicked')}
        />

        <TabBoxContent value="map" className="relative flex min-h-0 grow flex-col">
          <MapChips />
          <KakaoMap />

          {/* 선택된 매물 간단 카드 */}
          {selectedProp && (
            <div className="pointer-events-none absolute inset-x-0 bottom-4 z-30 flex justify-center px-4">
              <div className="pointer-events-auto w-full max-w-md rounded-2xl bg-white p-4 shadow-md">
                <div className="mb-2 text-sm font-semibold">{selectedProp.propertyName}</div>
                <div className="text-xs text-black/60">{selectedProp.address}</div>
                <div className="mt-2 flex items-center gap-2 text-xs text-black/80">
                  <span>
                    보증금 {selectedProp.depositBig ?? 0}
                    {selectedProp.depositSmall ? `/${selectedProp.depositSmall}` : ''}
                  </span>
                  {selectedProp.managementFee ? (
                    <span>관리비 {selectedProp.managementFee}</span>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </TabBoxContent>

        <TabBoxContent value="list" className="min-h-0 grow overflow-auto">
          <MapList />
        </TabBoxContent>
      </TabBox>
    </MainLayout>
  );
}
