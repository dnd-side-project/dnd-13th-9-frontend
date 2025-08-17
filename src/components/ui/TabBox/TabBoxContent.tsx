'use client';

import React from 'react';
import { useTabBoxContext } from './TabBoxContext';

export type TabBoxContentProps = {
  /** 노출할 탭 value */
  value: string;
  /** 탭 내용 */
  children: React.ReactNode;
  /** 래퍼 클래스 */
  className?: string;
};

// TabBox 전용 콘텐츠
export function TabBoxContent({ value, children, className }: TabBoxContentProps) {
  const context = useTabBoxContext();
  if (!context || context.activeValue !== value) return null;
  return <div className={className}>{children}</div>;
}
