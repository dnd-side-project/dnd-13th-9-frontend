'use client';

import React from 'react';
import { Icon } from '@/components/ui/Icon';
import { useMapStore } from '@/stores/useMapStore';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import ActiveFolder from '@assets/active-folder.svg';
import DefaultFolder from '@assets/default-folder.svg';
import { Body2xs, BodyS, TitleM, TitleXs } from '@/components/ui/Typography';

export function MapList() {
  const plans = useMapStore((s) => s.plans);
  const planId = useMapStore((s) => s.planId);
  const setPlanId = useMapStore((s) => s.setPlanId);
  const folders = useMapStore((s) => s.folders);
  const activeFolderId = useMapStore((s) => s.folderId);
  const router = useRouter();

  return (
    <div className="flex h-full flex-col gap-14 overflow-hidden py-4">
      <div className="flex flex-col gap-5">
        <div className="flex h-8 items-center justify-between gap-2 px-6">
          <TitleM>계획 폴더</TitleM>
          <button className="bg-coolGray-20 text-primary-50 flex h-8 items-center justify-center gap-1 rounded-full px-[10px] py-[6px]">
            <Icon name="add" color="primary-50" width={20} height={20} />
            <BodyS className="text-primary-50 font-semibold">새 계획</BodyS>
          </button>
        </div>
        {/* 계획 선택 - Swiper */}
        <div className="pl-4">
          <Swiper
            modules={[FreeMode]}
            slidesPerView={'auto'}
            spaceBetween={12}
            freeMode
            slidesOffsetAfter={16}
            className="scrollbar-hidden w-full"
          >
            {plans.map((p) => {
              const isActive = p.planId === planId;
              const FolderSVG = isActive ? ActiveFolder : DefaultFolder;
              return (
                <SwiperSlide key={p.planId} className="!w-[152px]">
                  <button
                    onClick={() => setPlanId(p.planId)}
                    className="relative block"
                    aria-pressed={isActive}
                  >
                    <FolderSVG width={152} height={118} />
                    <div className="absolute inset-0 mt-[18px] flex cursor-pointer items-start justify-between py-[14px] pr-[10px] pl-[14px]">
                      <div className="flex gap-1">
                        <TitleXs
                          className={`flex-1 truncate text-left text-sm font-semibold break-keep ${
                            isActive ? 'text-white' : 'text-coolGray-50'
                          }`}
                        >
                          {p.name}
                        </TitleXs>
                        <Body2xs
                          className={`flex h-[18px] w-[18px] items-center justify-center rounded-full text-xs font-semibold ${
                            isActive
                              ? 'bg-secondary-50 text-white'
                              : 'bg-coolGray-50 text-coolGray-20'
                          }`}
                        >
                          {p.folderCount}
                        </Body2xs>
                      </div>
                      <Icon
                        name="more"
                        width={24}
                        height={24}
                        color={isActive ? 'white' : 'coolGray-50'}
                      />
                    </div>
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      {/* 폴더 리스트 */}
      <div className="flex min-h-0 flex-1 flex-col gap-5">
        <div className="flex h-8 items-center justify-between gap-2 px-6">
          <div className="flex items-center gap-2">
            <ActiveFolder width={24} height={24} />
            <TitleM>{plans.find((p) => p.planId === planId)?.name ?? '폴더'}</TitleM>
          </div>
          <button className="bg-coolGray-20 text-primary-50 flex h-8 items-center justify-center gap-1 rounded-full px-[10px] py-[6px]">
            <Icon name="add" color="primary-50" width={20} height={20} />
            <BodyS className="text-primary-50 font-semibold">새 폴더</BodyS>
          </button>
        </div>
        <div className="min-h-0 flex-1 px-6 pb-4">
          <Swiper
            direction="vertical"
            modules={[FreeMode, Mousewheel]}
            slidesPerView={'auto'}
            spaceBetween={10}
            freeMode
            mousewheel
            className="h-full cursor-pointer"
          >
            {folders.map((f) => {
              const isActive = f.folderId === activeFolderId;
              return (
                <SwiperSlide key={f.folderId} className="!h-auto">
                  <button
                    onClick={() => router.push(`/map/folder/${f.folderId}`)}
                    className={`flex h-[72px] w-full cursor-pointer items-center justify-between rounded-[20px] p-6 text-left ${
                      isActive ? 'bg-primary-50' : 'bg-coolGray-20'
                    }`}
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
                          className={`flex h-[18px] w-[18px] items-center justify-center rounded-full text-[12px] font-semibold ${
                            isActive
                              ? 'bg-secondary-50 text-white'
                              : 'bg-coolGray-50 text-coolGray-20'
                          }`}
                        >
                          {f.recordCount}
                        </Body2xs>
                      </div>
                    </div>
                    <Icon
                      width={24}
                      height={24}
                      name="more"
                      color={isActive ? 'white' : 'coolGray-50'}
                    />
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default MapList;
