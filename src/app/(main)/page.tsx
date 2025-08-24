'use client';

import React from 'react';
import { MainLayout } from '@/components/layout';
import { VerticalSlider } from '@/components/main/VerticalSlider';
import { RouteBox } from '@/components/main/RouteBox';
import { IconTextRouter } from '@/components/main/IconTextRouter';
import { TitleL } from '@/components/ui/Typography';
import { Header } from '@/components/ui/Header';
import { Icon } from '@/components/ui/Icon';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <MainLayout>
      <Header
        left={
          <Icon
            name="house"
            color="primary-50"
            className="cursor-pointer"
            size={24}
            padding={10}
            onClick={() => router.push('/')}
          />
        }
        right={
          <Icon
            name="myPage"
            color="coolGray-50"
            className="cursor-pointer"
            size={24}
            padding={10}
            onClick={() => router.push('/mypage')}
          />
        }
      />

      <div className="w-full px-6">
        <VerticalSlider />

        <div className="flex w-full flex-row justify-center gap-4 py-4">
          <RouteBox
            routePath="/map"
            title="매물 지도"
            description="지도 위에 메모해둬야지"
            bgColor="#669AFF"
            size="large"
          />
          <div className="flex flex-col gap-4">
            <RouteBox
              routePath="/checklist"
              title="체크리스트"
              description="집 볼 땐 어떤걸 확인해야돼?"
              bgColor="#FBA907"
              size="small"
            />
            <RouteBox
              routePath="/vote"
              title="최종 후보지 투표"
              description="친구야! 넌 어떻게 생각해?"
              bgColor="#F4F4F4"
              size="small"
              textColor="#000000"
            />
          </div>
        </div>

        <div className="flex py-3">
          <IconTextRouter
            label="바로 메모"
            routePath="map/house-memo"
            icoPath="/assets/ico-memo.svg"
          />
          <IconTextRouter label="매물 리스트" routePath="/map" icoPath="/assets/ico-house.svg" />
          <IconTextRouter
            label="에티켓"
            routePath="/etiquette"
            icoPath="/assets/ico-etiquette.svg"
          />
          <IconTextRouter label="자취팁 영상" routePath="/tip" icoPath="/assets/ico-video.svg" />
        </div>

        <div className="py-6">
          <TitleL>최근에 본 집</TitleL>
        </div>
      </div>
    </MainLayout>
  );
}
