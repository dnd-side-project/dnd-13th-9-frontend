'use client';

import React from 'react';
import { MainLayout } from '@/components/layout';
import { VerticalSlider } from '@/components/main/VerticalSlider';
import { RouteBox } from '@/components/main/RouteBox';
import { IconTextRouter } from '@/components/main/IconTextRouter';
import { TitleL } from '@/components/ui/Typography';
import { Header } from '@/components/ui/Header';
import { Icon } from '@/components/ui/Icon';
import { RecentlyViewedHouses } from '@/components/main/RecentlyViewedHouses';
import { useRouter } from 'next/navigation';
import { useMyInfo } from '@/queries/user/useMyInfo';
import { colors } from '@/utils/style/colors';
import IcoZip from '@assets/ico-logo.svg';

export default function HomePage() {
  const router = useRouter();

  const { data, isLoading } = useMyInfo();

  const handleRightIconClick = () => {
    if (data) {
      router.push('/myPage');
    } else {
      router.push('/login');
    }
  };

  return (
    <MainLayout className="scrollbar-hidden pb-[56px]">
      <Header
        left={
          // <IcoZipText
          //   className="h-[34px] w-[114px] cursor-pointer"
          //   onClick={() => router.push('/')}
          // />
          <IcoZip className="h-10 w-10 cursor-pointer" onClick={() => router.push('/')} />
        }
        right={
          !isLoading && (
            <Icon
              name={data ? 'myPage' : 'login'}
              color="coolGray-50"
              className="cursor-pointer"
              size={24}
              onClick={handleRightIconClick}
            />
          )
        }
      />

      <div className="w-full px-6 pt-6">
        <VerticalSlider />

        <div className="flex w-full flex-row gap-[14px] py-5">
          <RouteBox
            routePath="/map"
            title="매물 지도"
            description="지도 위에 메모해둬야지"
            bgColor={colors.primary[50]}
            bgImageSrc="/assets/main/bg-map.svg"
            bgImageClassName="min-[440px]:-bottom-15 -bottom-18"
            overlayImageSrc="/assets/main/ico-map.svg"
            overlayClassName="min-[440px]:bottom-20 bottom-16 left-3 animate-float-slow"
            size="large"
          />
          <div className="flex basis-1/2 flex-col gap-4">
            <RouteBox
              routePath="/checklist"
              title="체크리스트"
              description="집 볼 땐 어떤걸 확인해?"
              bgColor={colors.secondary[50]}
              bgImageSrc="/assets/main/bg-checklist.svg"
              bgImageClassName="top-8 -right-1 rotate-30"
              overlayImageSrc="/assets/main/ico-checklist.svg"
              overlayClassName="animate-tilt-swing min-[440px]:left-[50%] left-[40%] -translate-x-1/2 bottom-1 rotate-50"
              size="small"
            />
            <RouteBox
              routePath="/vote"
              title="매물 비교 투표"
              description="친구야! 넌 어떻게 생각해?"
              bgColor={colors.neutral[40]}
              bgImageSrc="/assets/main/bg-vote.svg"
              overlayImageSrc="/assets/main/ico-vote.svg"
              overlayClassName="bottom-0 left-0 h-full animate-electric-jitter"
              size="small"
              textColor="#000000"
            />
          </div>
        </div>

        <div className="flex">
          <IconTextRouter
            label="바로 메모"
            routePath="map/house-memo"
            icoPath="/assets/main/ico-house-memo.svg"
          />
          <IconTextRouter
            label="내 메모.zip"
            routePath="/map?tab=list"
            icoPath="/assets/main/ico-memo-list.svg"
          />
          <IconTextRouter
            label="에티켓"
            routePath="/etiquette"
            icoPath="/assets/main/ico-etiquette.svg"
          />
          <IconTextRouter label="자취팁 영상" routePath="/tip" icoPath="/assets/main/ico-tip.svg" />
        </div>
      </div>
      <div className="px-6 pt-8 pb-4">
        <TitleL>최근에 본 집</TitleL>
      </div>
      <RecentlyViewedHouses />
    </MainLayout>
  );
}
