'use client';
import React from 'react';
import { Chip } from '@/components/ui/Chip';
import { IconName } from '../assets';

type Option = {
  text: string;
};

type ChipGroupProps<T extends string> = {
  options: Option[];
  value: T;
  onChange: (val: T) => void;
  activeChipColor: 'primary' | 'secondary';
  iconName?: IconName;
};

export function ChipGroup<T extends string>({
  options,
  value,
  onChange,
  activeChipColor,
  iconName,
}: ChipGroupProps<T>) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((item) => (
        <Chip
          key={item.text}
          text={item.text}
          variant={value === item.text ? activeChipColor : 'neutral'}
          onClick={() => onChange(item.text as T)}
          iconName={iconName}
        />
      ))}
    </div>
  );
}
