'use client';

import React from 'react';
import Image from 'next/image';
import { Icon } from '@/components/ui/Icon/Icon';
import { getFeelingIconName } from '@/utils/feeling';
import { useMapSelection } from '@/hooks/useMapSelection';
import { Body2xs, BodyS } from '@/components/ui/Typography';
import { useRouter } from 'next/navigation';
import { getContractLabel } from '@/utils/labels';
import { useMapStore } from '@/stores/useMapStore';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export function SelectedPropertyCard() {
  const { selectedProp } = useMapSelection();
  const router = useRouter();
  const memosInFolder = useMapStore((s) => s.memosInFolder);
  const selectedMemoId = useMapStore((s) => s.selectedMemoId);
  const setSelectedMemoId = useMapStore((s) => s.setSelectedMemoId);

  const swiperRef = React.useRef<any | null>(null);
  const isUserSlidingRef = React.useRef(false);
  const cardRef = React.useRef<HTMLDivElement | null>(null);

  // Swiper instance helpers for readability
  const isSwiperDestroyed = (inst: any) => !inst || Boolean(inst.destroyed);
  const getActiveIndex = (inst: any) => (inst?.realIndex ?? inst?.activeIndex ?? 0) as number;

  // Event handlers (extracted for clarity)
  const handleSwiperMount = React.useCallback((inst: any) => {
    swiperRef.current = inst;
  }, []);
  const handleTouchStart = React.useCallback(() => {
    isUserSlidingRef.current = true;
  }, []);
  const handleTouchEnd = React.useCallback(() => {
    window.setTimeout(() => {
      isUserSlidingRef.current = false;
    }, 150);
  }, []);
  const handleTransitionEnd = React.useCallback(() => {
    isUserSlidingRef.current = false;
  }, []);
  const handleSlideChange = React.useCallback(
    (inst: any) => {
      if (isSwiperDestroyed(inst)) return;
      if (!isUserSlidingRef.current) return;
      const idx = getActiveIndex(inst);
      const next = memosInFolder[idx];
      if (next) setSelectedMemoId(next.id);
    },
    [memosInFolder, setSelectedMemoId]
  );

  const placeTagToIcon: Record<string, any> = {
    ADVANTAGE: 'mapNearbyGood',
    DISADVANTAGE: 'mapNearbyBad',
    CONVENIENCE: 'mapNearbyConvenience',
    TRANSPORTATION: 'mapNearbyTransportation',
    SECURITY: 'mapNearbySecurity',
    NOISE: 'mapNearbyNoise',
  };

  // 외부 선택 변경 시 슬라이드 인덱스 동기화
  React.useEffect(() => {
    if (!swiperRef.current || (swiperRef.current as any).destroyed || !selectedMemoId) return;
    const idx = memosInFolder.findIndex((m) => m.id === selectedMemoId);
    if (idx >= 0) {
      const currentIndex = (swiperRef.current as any).realIndex ?? swiperRef.current.activeIndex;
      if (currentIndex !== idx) {
        const inst = swiperRef.current as any;
        if (typeof inst.slideToLoop === 'function') inst.slideToLoop(idx, 0, false);
        else if (typeof inst.slideTo === 'function') inst.slideTo(idx, 0, false);
      }
    }
  }, [selectedMemoId, memosInFolder]);

  // 카드 외부 클릭 시 닫기 (문서 전역 클릭 감지)
  React.useEffect(() => {
    const handleDocClick = (e: MouseEvent) => {
      const el = cardRef.current;
      if (!el) return;
      const target = e.target as Node | null;
      if (target && el.contains(target)) return; // 카드 내부 클릭은 무시
      setSelectedMemoId(null);
    };
    document.addEventListener('click', handleDocClick);
    return () => document.removeEventListener('click', handleDocClick);
  }, [setSelectedMemoId]);

  if (!selectedProp) return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-10 z-30 flex justify-center px-4">
      <div ref={cardRef} className="pointer-events-auto w-full">
        <Swiper
          slidesPerView={1}
          spaceBetween={16}
          loop={false}
          onSwiper={handleSwiperMount}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTransitionEnd={handleTransitionEnd}
          onSlideChange={handleSlideChange}
          initialSlide={Math.max(
            0,
            memosInFolder.findIndex((m) => m.id === selectedMemoId)
          )}
        >
          {memosInFolder.map((m) => {
            const feelingIconForM = m.feeling ? getFeelingIconName(m.feeling as any) : 'soSoFill';
            return (
              <SwiperSlide key={m.id}>
                <div
                  className="h-[114px] w-full cursor-pointer overflow-hidden rounded-2xl bg-white p-3 shadow-md"
                  onClick={() => {
                    const href =
                      m.type === 'NEARBY'
                        ? `/map/nearby-memo/${m.id.replace('near_', '')}`
                        : `/map/house-memo/${m.id.replace('prop_', '')}`;
                    router.push(href);
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-neutral-30 h-[90px] w-[90px] overflow-hidden rounded-xl">
                      {m.images[0]?.url ? (
                        // 이미지 영역
                        <img
                          src={m.images[0]?.url ?? ''}
                          alt={m.title ?? ''}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div
                          className={`${m.type === 'NEARBY' ? 'bg-secondary-10' : 'bg-coolGray-20'} flex h-full w-full items-center justify-center`}
                        >
                          {m.type === 'NEARBY' ? (
                            <Icon name="favorite" color="secondary" width={32} height={32} />
                          ) : (
                            <Icon name="house" color="primary-50" width={32} height={32} />
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex min-w-0 flex-1">
                      <div className="flex flex-col gap-1">
                        {m.type === 'NEARBY' ? (
                          <>
                            <div className="flex items-center gap-2">
                              <Icon
                                name={(placeTagToIcon[m.tag ?? ''] ?? 'mapNearbyGood') as any}
                                width={20}
                                height={20}
                                color="secondary"
                              />
                              <div className="truncate text-base font-semibold text-black">
                                {m.title}
                              </div>
                            </div>
                            <Body2xs className="text-neutral-80 line-clamp-3">
                              {m.memo ?? ''}
                            </Body2xs>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-2">
                              <Icon name={feelingIconForM as any} width={20} height={20} />
                              <div className="truncate text-base font-semibold text-black">
                                {m.title}
                              </div>
                            </div>
                            <BodyS className="text-neutral-100">
                              {getContractLabel(m.contractType as any)}&nbsp;
                              <span>
                                {[
                                  m.depositBig ? `${m.depositBig}억` : null,
                                  m.depositSmall
                                    ? `${m.depositSmall}${m.depositBig ? '만원' : ''}`
                                    : null,
                                ]
                                  .filter(Boolean)
                                  .join(' ')}
                              </span>
                              <span>{m.managementFee ? `/ ${m.managementFee}` : ''}</span>
                            </BodyS>
                            <Body2xs className="text-neutral-80 line-clamp-2">
                              {m.address ?? ''}
                            </Body2xs>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
