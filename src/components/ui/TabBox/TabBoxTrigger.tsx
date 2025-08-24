'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTabBoxContext } from './TabBoxContext';
import { cn } from '@/utils/utils';
import { Icon } from '@/components/ui/Icon/Icon';

type Props = {
  value: string;
  leadingIcon?: React.ReactNode;
  children: React.ReactNode;
  /**
   * Return true to intercept and prevent activating this tab (e.g., when you navigate elsewhere).
   * Return false/void to allow normal activation.
   */
  onActivate?: () => boolean | void;
};

// TabBox 전용 아이템. 기존 Tabs 컨텍스트를 재사용하여 활성 상태를 동기화
export function TabBoxTrigger({ value, leadingIcon, children, onActivate }: Props) {
  const context = useTabBoxContext();
  const { activeValue, setActiveValue } = context ?? { activeValue: '', setActiveValue: () => {} };
  const isActive = activeValue === value;

  return (
    <button
      type="button"
      onClick={() => {
        const intercepted = onActivate?.();
        if (intercepted) return;
        setActiveValue(value);
      }}
      className={cn(
        'fit-content relative inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold',
        isActive ? 'text-white' : 'text-neutral-60'
      )}
    >
      {/* 배경 (활성 시에만) */}
      {isActive && (
        <motion.div
          layoutId="tabbox-bg"
          className="bg-coolGray-80 absolute inset-0 rounded-full"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}

      {/* 내용 */}
      <span className="relative z-10 inline-flex items-center gap-1">
        {(() => {
          if (!leadingIcon || !React.isValidElement(leadingIcon)) return leadingIcon;
          const props: any = (leadingIcon as any).props ?? {};
          if (props.name) {
            return (
              <Icon
                name={props.name}
                size={props.size}
                padding={props.padding}
                color={isActive ? 'white' : (props.color ?? 'neutral')}
              />
            );
          }
          return React.cloneElement(
            leadingIcon as React.ReactElement<any>,
            {
              color: isActive ? 'white' : (props.color ?? 'neutral'),
            } as any
          );
        })()}
        {children}
      </span>
    </button>
  );
}
