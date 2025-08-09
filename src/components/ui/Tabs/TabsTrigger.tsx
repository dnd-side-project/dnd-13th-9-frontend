'use client';
import React from 'react';
import { useTabsContext } from './TabsContext';
import { cn } from '@/utils/utils';

type TabsTriggerProps = {
  value: string;
  children: React.ReactNode;
};

export function TabsTrigger({ value, children }: TabsTriggerProps) {
  const context = useTabsContext();
  const { activeTab, setActiveTab } = context ?? { activeTab: '', setActiveTab: () => {} };
  const isActive = activeTab === value;

  return (
    <button
      className={cn(
        'flex-1 px-6 py-3.5 pb-2 font-semibold',
        isActive
          ? 'border-b-3 border-blue-500 text-black'
          : 'border-b-3 border-b-transparent text-neutral-400'
      )}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}
