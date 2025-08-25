import React, { useMemo, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { FreeMode, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import { Icon } from '@/components/ui/Icon';
import { Body2xs, TitleM, TitleXs } from '@/components/ui/Typography';
import { useMapStore } from '@/stores/useMapStore';
import { useSelectedPlanName } from '@/hooks/useSelectedPlanName';
import ActiveFolder from '@assets/active-folder.svg';

export function FolderGrid() {
  const folders = useMapStore((s) => s.folders);
  const activeFolderId = useMapStore((s) => s.folderId);
  const setFolderId = useMapStore((s) => s.setFolderId);
  const planName = useSelectedPlanName();

  const swiperRef = useRef<SwiperType | null>(null);
  const activeIndex = useMemo(
    () =>
      Math.max(
        0,
        folders.findIndex((f) => f.folderId === activeFolderId)
      ),
    [folders, activeFolderId]
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-5">
      <div className="flex h-8 items-center justify-between gap-2 px-6">
        <div className="flex items-center gap-2">
          <ActiveFolder width={24} height={24} />
          <TitleM>{planName}</TitleM>
        </div>
        <button className="bg-coolGray-20 text-primary-50 flex h-8 items-center justify-center gap-1 rounded-full px-[10px] py-[6px]">
          <Icon name="add" color="primary-50" width={20} height={20} />
          <Body2xs className="text-primary-50 font-semibold">새 폴더</Body2xs>
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
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            if (activeIndex > 0) {
              swiper.slideTo(0, 0, false);
              setTimeout(() => swiper.slideTo(activeIndex, 500, true), 150);
            }
          }}
        >
          {folders.map((f, idx) => {
            const isActive = f.folderId === activeFolderId;
            return (
              <SwiperSlide key={f.folderId ?? `folder-idx-${idx}`} className="!h-auto">
                <button
                  onClick={() => {
                    setFolderId(f.folderId);
                    swiperRef.current?.slideTo(Math.max(0, idx), 350, true);
                  }}
                  className={`flex h-[72px] w-full cursor-pointer items-center justify-between rounded-[20px] p-6 text-left ${isActive ? 'bg-primary-50' : 'bg-coolGray-20'}`}
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
                        className={`flex h-[18px] w-[18px] items-center justify-center rounded-full text-[12px] font-semibold ${isActive ? 'bg-secondary-50 text-white' : 'bg-coolGray-50 text-coolGray-20'}`}
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
  );
}
