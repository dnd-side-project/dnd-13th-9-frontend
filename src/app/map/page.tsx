'use client';

import React from 'react';
import { MainLayout } from '@/components/layout';
import { TabBox, TabBoxList, TabBoxTrigger, TabBoxContent } from '@/components/ui/TabBox';
import { MapChips } from '@/components/map/Map/MapChips';
import { KakaoMap } from '@/components/map/Map/KakaoMap';
import { FolderList } from '@/components/map/List/FolderList';
import { Icon } from '@/components/ui/Icon/Icon';
import { Header } from '@/components/ui/Header';

export default function MapPage() {
  return (
    <MainLayout>
      <TabBox defaultValue="map" className="flex min-h-0 grow flex-col">
        <Header
          center={
            <TabBoxList className="fit-content">
              <TabBoxTrigger value="map" leadingIcon={<Icon name="map" size={18} />}>
                맵
              </TabBoxTrigger>
              <TabBoxTrigger value="list" leadingIcon={<Icon name="list" size={18} />}>
                리스트
              </TabBoxTrigger>
            </TabBoxList>
          }
          rightIconName="search"
          rightAction={() => alert('right action clicked')}
        />

        <TabBoxContent value="map" className="relative flex min-h-0 grow flex-col">
          <MapChips />
          <KakaoMap className="flex-1 px-0" fitParent />
        </TabBoxContent>

        <TabBoxContent value="list" className="min-h-0 grow overflow-auto">
          <div className="text-neutral-60 flex items-center justify-center py-20">
            리스트는 준비 중입니다.
          </div>
        </TabBoxContent>
      </TabBox>
    </MainLayout>
  );
}
