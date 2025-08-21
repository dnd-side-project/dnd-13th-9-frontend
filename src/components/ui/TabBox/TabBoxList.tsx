'use client';

import React from 'react';
import { cn } from '@/utils/utils';

type TabBoxListProps = React.PropsWithChildren<{ className?: string }>;

// TabBox 아이템들을 감싸는 래퍼
// - 기본적으로 pill 배경과 패딩을 포함해 한 단계의 래퍼만으로 충분하게 구성
export function TabBoxList({ className, children }: TabBoxListProps) {
  return (
    <div className={cn('bg-neutral-30 flex items-center rounded-full px-[6px] py-1', className)}>
      {children}
    </div>
  );
}
