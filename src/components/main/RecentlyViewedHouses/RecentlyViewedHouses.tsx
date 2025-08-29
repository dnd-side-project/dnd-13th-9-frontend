'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Body2xs, BodyS, TitleXs } from '@/components/ui/Typography';
import { Icon } from '@/components/ui/Icon';
import { useRecentProperties } from '@/queries/property/useRecentProperties';
import { getFeelingColor, getFeelingIconName } from '@/utils/feeling';
import { getContractLabel } from '@/utils/labels';
import { useRouter } from 'next/navigation';
import { Loading } from '@/components/ui/Loading';
import IcoEmpty from '@assets/ico-empty.svg';
import { useMyInfo } from '@/queries/user/useMyInfo';
import { Button } from '@/components/ui/Button';
import IcoHouse from '@assets/login/lco-house.svg';
import IcoLight from '@assets/login/lco-light.svg';
import IcoPlants from '@assets/login/lco-plants.svg';
import IcoSearch from '@assets/login/lco-search.svg';

function formatDeposit(big: number, small: number) {
  const parts: string[] = [];
  if (big) parts.push(`${big}억`);
  if (small) parts.push(`${small}${big ? '만원' : ''}`);
  return parts.join(' ');
}

export function RecentlyViewedHouses() {
  const { data: myInfo, isLoading: isAuthLoading, isFetching: isAuthFetching } = useMyInfo();
  const isAuthed = Boolean(myInfo);
  const { data, isLoading } = useRecentProperties(isAuthed);
  const router = useRouter();

  // 1) 인증 상태 판별 중에는 로딩 노출 (새로고침/로그인 직후 깜빡임 방지)
  if (isAuthLoading || isAuthFetching)
    return (
      <div className="flex h-[200px] items-center justify-center">
        <Loading size="large" />
      </div>
    );

  if (!isAuthed)
    return (
      <div className="px-6">
        <div className="flex h-[240px] flex-col items-center justify-center gap-4 rounded-xl bg-white p-4 text-center shadow-[0_1px_5px_rgba(0,0,0,0.05)]">
          <div className="relative h-[100px] w-[90px]">
            <IcoHouse className="h-[100px] w-[90px]" />
            <IcoLight className="animate-light-sway absolute top-1 left-1/2 h-[30px] w-[26px] -translate-x-1/2" />
            <IcoPlants className="animate-plant-sway absolute right-[-6px] bottom-[14px] h-[45px] w-[40px]" />
            <IcoSearch className="animate-search-inspect absolute top-[4px] left-[10px] h-[38px] w-[44px] -translate-x-1/2 rotate-[5deg]" />
          </div>
          <TitleXs className="text-neutral-60 text-[16px] font-medium">
            로그인하고 최근 본 집 보러가기
          </TitleXs>
          <Button
            size="small"
            className="h-[40px]"
            onClick={() => {
              const redirect =
                typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : '/';
              router.push(`/login?redirect=${redirect}`);
            }}
          >
            로그인
          </Button>
        </div>
      </div>
    );

  if (isLoading)
    return (
      <div className="flex h-[200px] items-center justify-center">
        <Loading size="large" />
      </div>
    );

  // 테스트용: URL에 ?recent-empty=1 붙이면 빈 상태 강제 노출
  const forceEmpty =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('recent-empty') === '1';

  const items = data ?? [];
  const shouldShowEmpty = forceEmpty || items.length === 0;

  if (shouldShowEmpty) {
    return (
      <div className="px-6">
        <div className="flex h-[240px] flex-col items-center justify-center gap-4 rounded-xl bg-white p-4 text-center shadow-[0_1px_5px_rgba(0,0,0,0.05)]">
          <div className="relative h-[100px] w-[90px]">
            <IcoHouse className="h-[100px] w-[90px]" />
            <IcoLight className="animate-light-sway absolute top-1 left-1/2 h-[30px] w-[26px] -translate-x-1/2" />
            <IcoPlants className="animate-plant-sway absolute right-[-6px] bottom-[14px] h-[45px] w-[40px]" />
            <IcoSearch className="animate-search-inspect absolute top-[4px] left-[10px] h-[38px] w-[44px] -translate-x-1/2 rotate-[5deg]" />
          </div>
          <TitleXs className="text-neutral-60 text-[16px] font-medium">
            새로운 매물을 확인하고 메모를 남겨보세요!
          </TitleXs>
          <Button
            size="small"
            className="h-[40px]"
            onClick={() => {
              router.push('/map/house-memo');
            }}
          >
            바로 메모
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="scrollbar-hidden min-h-[210px] overflow-x-hidden pl-4">
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={12}
        slidesOffsetAfter={16}
        className="w-full"
        style={{ overflow: 'visible' }}
      >
        {items.map((item) => {
          const feelingIcon = item.feeling ? getFeelingIconName(item.feeling) : undefined;
          const feelingColor = item.feeling ? getFeelingColor(item.feeling) : undefined;
          const deposit = formatDeposit(item.depositBig, item.depositSmall);
          const fee = item.managementFee ? `/ ${item.managementFee}` : '';
          const contract = getContractLabel(item.contractType);

          return (
            <SwiperSlide key={item.propertyId} style={{ width: 156, overflow: 'visible' }}>
              <div
                className="h-[200px] w-[156px] cursor-pointer rounded-xl bg-white shadow-[0_1px_5px_rgba(0,0,0,0.05)]"
                role="button"
                tabIndex={0}
                onClick={() => router.push(`/map/house-memo/${item.propertyId}`)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    router.push(`/map/house-memo/${item.propertyId}`);
                  }
                }}
              >
                <div className="relative h-[114px] w-full overflow-hidden rounded-t-xl">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="212px"
                    />
                  ) : (
                    <div className="bg-neutral-20 flex h-full w-full items-center justify-center">
                      <Image src="/assets/ico-no-image.svg" alt="no image" width={60} height={60} />
                    </div>
                  )}
                </div>
                <div className="border-neutral-20 overflow-hidden border-t px-3 py-[10px]">
                  <div className="flex min-w-0 items-center gap-1">
                    {feelingIcon && (
                      <Icon name={feelingIcon as any} color={feelingColor as any} size={20} />
                    )}
                    <TitleXs className="truncate">{item.title}</TitleXs>
                  </div>
                  <BodyS className="text-neutral-70 mt-1">
                    {contract} {deposit}
                    {fee}
                  </BodyS>
                  <Body2xs className="text-neutral-60 mt-1 block w-full truncate text-right whitespace-nowrap">
                    {item.planName} | {item.folderName}
                  </Body2xs>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
