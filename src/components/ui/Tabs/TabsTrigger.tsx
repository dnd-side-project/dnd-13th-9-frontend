'use client';
import React from 'react';
import { motion } from 'framer-motion';
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
        'relative h-12 flex-1 px-6 py-3.5 font-semibold whitespace-nowrap transition-colors duration-200',
        isActive ? 'text-black' : 'text-neutral-60 hover:text-black'
      )}
      onClick={() => setActiveTab(value)}
    >
      {children}

      {isActive && (
        <motion.div
          layoutId="tabs-underline"
          className="absolute bottom-0 left-0 h-1 w-full bg-blue-500"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </button>
  );
}
