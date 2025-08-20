import React from 'react';
import Link from 'next/link';
import { MainLayout } from '@/components/layout';
import { TabBox, TabBoxList, TabBoxTrigger, TabBoxContent } from '@/components/ui/TabBox';
import { Icon } from '@/components/ui/Icon/Icon';
import { MapChips } from '@/components/map/Map/MapChips';
import { KakaoMap } from '@/components/map/Map/KakaoMap';
import { FolderList } from '@/components/map/List/FolderList';

export default function MapPage() {
  return (
    <MainLayout>
      <TabBox defaultValue="map" className="flex min-h-0 grow flex-col">
        <header className="flex w-full items-center justify-between px-2 py-2">
          <Link href="/">
            <Icon name="arrowLeft" size={24} padding={10} />
          </Link>
          <TabBoxList className="fit-content">
            <TabBoxTrigger value="map" leadingIcon={<Icon name="map" size={18} />}>
              맵
            </TabBoxTrigger>
            <TabBoxTrigger value="list" leadingIcon={<Icon name="list" size={18} />}>
              리스트
            </TabBoxTrigger>
          </TabBoxList>
          <button>
            <Icon name="search" size={24} padding={10} />
          </button>
        </header>

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
