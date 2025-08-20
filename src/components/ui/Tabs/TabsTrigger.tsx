'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useTabsContext } from './TabsContext';
import { cn } from '@/utils/utils';
import { BodyS } from '../Typography';

type BarProps = {
  value: string;
  children: React.ReactNode;
  className?: string;
};

type ChipProps = {
  value: string;
  text?: string;
  chipVariant?: 'primary' | 'secondary';
  className?: string;
};

function TabsTrigger() {
  throw new Error(
    'Direct use of TabsTrigger is not allowed. Use TabsTrigger.Bar or TabsTrigger.Chip.'
  );
}

TabsTrigger.Bar = function ({ value, children, className }: BarProps) {
  const context = useTabsContext();
  const { activeTab, setActiveTab } = context ?? { activeTab: '', setActiveTab: () => {} };
  const isActive = activeTab === value;

  return (
    <button
      className={cn(
        'relative h-12 flex-1 px-6 py-3.5 font-semibold whitespace-nowrap transition-colors duration-200',
        isActive ? 'text-black' : 'text-neutral-60 hover:text-black',
        className
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
};

TabsTrigger.Chip = function ({ value, text, className }: ChipProps) {
  const context = useTabsContext();
  const { activeTab, setActiveTab } = context ?? { activeTab: '', setActiveTab: () => {} };
  const isActive = activeTab === value;

  const badgeStyle = isActive ? 'bg-[#669AFF] text-white' : 'bg-white text-[#707070]';

  return (
    <div
      onClick={() => setActiveTab(value)}
      className={cn('w-min cursor-pointer rounded-3xl px-5 py-2', badgeStyle, className)}
    >
      <BodyS className="text-center whitespace-nowrap">{text}</BodyS>
    </div>
  );
};

export { TabsTrigger };
