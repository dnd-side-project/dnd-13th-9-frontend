'use client';
import React from 'react';
import { Chip } from '@/components/ui/Chip';
import { IconName } from '../assets';

type Option = {
  text: string;
  value?: string;
};

type ChipGroupProps<T extends string> = {
  options: Option[];
  value: T;
  onChange: (val: T) => void;
  activeChipColor: 'primary' | 'secondary';
  iconName?: IconName | ((optionValue: string, isActive: boolean) => IconName);
  className?: string;
};

export function ChipGroup<T extends string>({
  options,
  value,
  onChange,
  activeChipColor,
  iconName,
  className,
}: ChipGroupProps<T>) {
  return (
    <div className={`flex flex-wrap gap-2`}>
      {options.map((item) => {
        const optionValue = item.value || item.text;
        const isActive = value === optionValue;

        const finalIconName =
          typeof iconName === 'function' ? iconName(optionValue, isActive) : iconName;

        return (
          <Chip
            key={item.text}
            text={item.text}
            variant={isActive ? activeChipColor : 'neutral'}
            onClick={() => onChange(optionValue as T)}
            iconName={finalIconName}
            className={className}
          />
        );
      })}
    </div>
  );
}
