'use client';
import React from 'react';

import { useTabsContext } from './TabsContext';
import { cn } from '@/utils/utils';
import { BodyS } from '../Typography';
import { IconName } from '../assets';
import { Icon } from '../Icon';
import { motion, AnimatePresence } from 'framer-motion';

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
  iconName?: IconName | ((isActive: boolean) => IconName);
};

export function TabsTrigger() {
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
          className="bg-primary-50 absolute bottom-0 left-0 h-1"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          exit={{ width: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      )}
    </button>
  );
};

TabsTrigger.Chip = function ({ iconName, value, text, className }: ChipProps) {
  const context = useTabsContext();
  const { activeTab, setActiveTab } = context ?? { activeTab: '', setActiveTab: () => {} };
  const isActive = activeTab === value;

  const badgeStyle = isActive ? 'bg-[#669AFF] text-white' : 'bg-white text-[#707070]';

  const finalIconName = typeof iconName === 'function' ? iconName(isActive) : iconName;

  return (
    <div
      onClick={() => setActiveTab(value)}
      className={cn(
        'flex w-min cursor-pointer flex-row items-center gap-1 rounded-3xl px-2 py-2 pr-3',
        badgeStyle,
        className
      )}
    >
      {finalIconName && <Icon name={finalIconName} width={30} />}
      <BodyS className="text-center whitespace-nowrap">{text}</BodyS>
    </div>
  );
};
