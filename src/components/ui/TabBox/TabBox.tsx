'use client';

import React, { useState } from 'react';
import { TabBoxContext } from './TabBoxContext';

export type TabBoxProps = {
  /** 초기 활성 탭의 값 */
  defaultValue: string;
  children?: React.ReactNode;
  className?: string;
};

// TabBox 컨텍스트를 제공하는 최상위 컨테이너 (상태 보관)
export function TabBox({ defaultValue, children, className }: TabBoxProps) {
  const [activeValue, setActiveValue] = useState(defaultValue);
  return (
    <TabBoxContext.Provider value={{ activeValue, setActiveValue }}>
      <div className={className}>{children}</div>
    </TabBoxContext.Provider>
  );
}
