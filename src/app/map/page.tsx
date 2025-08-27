'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MainLayout } from '@/components/layout';
import { TabBox, TabBoxList, TabBoxTrigger, TabBoxContent } from '@/components/ui/TabBox';
import { MapChips } from '@/components/map/MapTab/MapChips';
import { KakaoMap } from '@/components/map/Map/KakaoMap';
import { MapList } from '@/components/map/ListTab/MapList';
import { Icon } from '@/components/ui/Icon/Icon';
import { Header } from '@/components/ui/Header';
import { useMapSelection } from '@/hooks/useMapSelection';
import { useMapStore } from '@/stores/useMapStore';
import { SelectedPropertyCard } from '@/components/map/MapTab/SelectedPropertyCard';

export default function MapPage() {
  const { selectedProp } = useMapSelection();
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
          leftBack
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
          right={
            <Icon
              name="house"
              color="coolGray-50"
              className="cursor-pointer"
              size={24}
              onClick={() => router.push('/')}
            />
          }
        />

        <TabBoxContent value="map" className="relative flex min-h-0 grow flex-col">
          <MapChips />
          <KakaoMap />
          <SelectedPropertyCard />
        </TabBoxContent>

        <TabBoxContent value="list" className="min-h-0 grow overflow-auto">
          <MapList />
        </TabBoxContent>
      </TabBox>
    </MainLayout>
  );
}
