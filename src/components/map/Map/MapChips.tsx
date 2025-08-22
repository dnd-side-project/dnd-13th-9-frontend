'use client';

import React, { useMemo, useState } from 'react';
import { CategoryChip } from '@/components/ui/CategoryChip';
import { Chip } from '@/components/ui/Chip/Chip';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import { categories as baseCategories, allFolders as baseAllFolders } from './mapData';

export function MapChips() {
  const categories = useMemo(() => baseCategories, []);
  type Category = (typeof categories)[number];
  const allFolders = useMemo(() => baseAllFolders as Record<Category, string[]>, []);
  const [selectedCategory, setSelectedCategory] = useState<Category>(categories[0]);
  const folders = allFolders[selectedCategory];

  return (
    <div className="py-3 pl-6">
      <div className="flex items-center gap-2">
        <CategoryChip
          options={categories}
          value={selectedCategory}
          onChange={(v) => setSelectedCategory(v as Category)}
        />
        <Swiper
          modules={[FreeMode]}
          slidesPerView="auto"
          spaceBetween={8}
          freeMode
          className="scrollbar-hidden w-full"
        >
          {folders.map((name: string, idx: number) => (
            <SwiperSlide key={idx} style={{ width: 'auto' }}>
              <Chip text={name} variant={idx === 0 ? 'primary' : 'neutral'} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
