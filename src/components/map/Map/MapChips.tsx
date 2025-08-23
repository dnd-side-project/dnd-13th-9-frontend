'use client';

import React, { useMemo } from 'react';
import { CategoryChip } from '@/components/ui/CategoryChip';
import { Chip } from '@/components/ui/Chip/Chip';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import { useMapStore } from '@/stores/useMapStore';

export function MapChips() {
  const plans = useMapStore((s) => s.plans);
  const planId = useMapStore((s) => s.planId);
  const setPlanId = useMapStore((s) => s.setPlanId);
  const folders = useMapStore((s) => s.folders);
  const folderId = useMapStore((s) => s.folderId);
  const setFolderId = useMapStore((s) => s.setFolderId);

  const planOptions = useMemo(() => plans.map((p) => p.name), [plans]);
  const nameToId = useMemo(() => Object.fromEntries(plans.map((p) => [p.name, p.planId])), [plans]);
  const selectedPlanName = useMemo(
    () => plans.find((p) => p.planId === planId)?.name ?? planOptions[0] ?? '선택',
    [plans, planId, planOptions]
  );

  return (
    <div className="py-3 pl-6">
      <div className="flex items-center gap-2">
        {/* Plan 선택 */}
        <CategoryChip
          options={planOptions}
          value={selectedPlanName}
          onChange={(v) => {
            const id = nameToId[v];
            if (id) setPlanId(id);
          }}
        />

        {/* Folder 선택 */}
        <Swiper
          modules={[FreeMode]}
          slidesPerView="auto"
          spaceBetween={8}
          freeMode
          slidesOffsetAfter={16}
          className="scrollbar-hidden w-full"
        >
          {folders.map((f) => (
            <SwiperSlide key={f.folderId} style={{ width: 'auto' }}>
              <button type="button" onClick={() => setFolderId(f.folderId)}>
                <Chip text={f.name} variant={f.folderId === folderId ? 'primary' : 'neutral'} />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
