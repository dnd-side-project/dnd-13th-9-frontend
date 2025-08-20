'use client';

import React, { useMemo, useState } from 'react';
import { CategoryChip } from '@/components/ui/CategoryChip';
import { Chip } from '@/components/ui/Chip/Chip';
import { categories as baseCategories, allFolders as baseAllFolders } from './mapData';

export function MapChips() {
  const categories = useMemo(() => baseCategories, []);
  type Category = (typeof categories)[number];
  const allFolders = useMemo(() => baseAllFolders as Record<Category, string[]>, []);
  const [selectedCategory, setSelectedCategory] = useState<Category>(categories[0]);
  const folders = allFolders[selectedCategory];

  return (
    <div className="py-3 pl-6">
      <div className="flex flex-wrap items-center gap-2">
        <CategoryChip
          options={categories}
          value={selectedCategory}
          onChange={(v) => setSelectedCategory(v as Category)}
        />
        <div className="scrollbar-hidden flex w-full flex-1 gap-2 overflow-x-auto">
          {folders.map((name: string, idx: number) => (
            <Chip key={idx} text={name} variant={idx === 0 ? 'primary' : 'secondary'} />
          ))}
        </div>
      </div>
    </div>
  );
}
