'use client';
import React from 'react';
import { Chip } from '@/components/ui/Chip';

type Option = {
  text: string;
};

type ChipGroupProps<T extends string> = {
  options: Option[];
  value: T;
  onChange: (val: T) => void;
};

export function ChipGroup<T extends string>({ options, value, onChange }: ChipGroupProps<T>) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((item) => (
        <Chip
          key={item.text}
          text={item.text}
          variant={value === item.text ? 'primary' : 'secondary'}
          onClick={() => onChange(item.text as T)}
        />
      ))}
    </div>
  );
}
