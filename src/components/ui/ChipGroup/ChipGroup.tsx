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
    <div className={`flex flex-wrap gap-2 ${className || ''}`}>
      {options.map((item) => {
        const optionValue = item.value || item.text;
        const isActive = value === optionValue;

        // iconName이 함수인지 확인하고 적절한 아이콘 결정
        const finalIconName =
          typeof iconName === 'function' ? iconName(optionValue, isActive) : iconName;

        return (
          <Chip
            key={item.text}
            text={item.text}
            variant={isActive ? activeChipColor : 'neutral'}
            onClick={() => onChange(optionValue as T)}
            iconName={finalIconName}
          />
        );
      })}
    </div>
  );
}
