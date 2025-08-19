'use client';

import React, { useMemo, useState } from 'react';
import { CategoryChip } from '@/components/ui/CategoryChip';
import { Chip } from '@/components/ui/Chip/Chip';

export function MapChips() {
  const categories = useMemo(() => ['계획', '학교', '직장', '기타'] as const, []);
  type Category = (typeof categories)[number];
  const allFolders = useMemo(
    () =>
      ({
        계획: ['기본 폴더', '폴더 A', '폴더 B'],
        학교: ['북학', '수원 캠퍼스 근처'],
        직장: ['인근 회사', '프로젝트 장소'],
        기타: ['임시 폴더'],
      }) as Record<Category, string[]>,
    []
  );
  const [selectedCategory, setSelectedCategory] = useState<Category>(categories[0]);
  const folders = allFolders[selectedCategory];

  return (
    <div className="px-6 py-3">
      <div className="flex flex-wrap items-center gap-2">
        <CategoryChip
          options={categories}
          value={selectedCategory}
          onChange={(v) => setSelectedCategory(v as Category)}
        />
        {folders.map((name: string, idx: number) => (
          <Chip key={idx} text={name} variant={idx === 0 ? 'primary' : 'secondary'} />
        ))}
      </div>
    </div>
  );
}
