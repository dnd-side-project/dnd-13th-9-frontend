'use client';

import React, { useMemo, useRef, useState } from 'react';
import { cn } from '@/utils/utils';
import { BodyS } from '@/components/ui/Typography';
import { Icon } from '@/components/ui/Icon/Icon';

type Props = {
  options: readonly string[];
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>;

export function CategoryChip({
  options,
  value,
  placeholder = '선택',
  onChange,
  className,
  ...props
}: Props) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const label = useMemo(() => value ?? placeholder, [value, placeholder]);

  return (
    <div className={cn('relative inline-block', className)} ref={wrapperRef} {...props}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'inline-flex items-center gap-1 rounded-3xl border px-4 py-2',
          value
            ? 'border-primary-55 text-primary-55 bg-white'
            : 'border-neutral-40 text-neutral-80 bg-white'
        )}
      >
        <BodyS className="whitespace-nowrap">{label}</BodyS>
        <Icon name="arrowDown" size={14} color={value ? 'primary' : 'neutral'} />
      </button>

      {open && (
        <div className="absolute top-[calc(100%+6px)] left-0 z-50 min-w-[160px] overflow-hidden rounded-xl bg-white py-2 shadow-md">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              className={cn(
                'flex w-full items-center px-4 py-2 text-left',
                opt === value
                  ? 'bg-neutral-20 text-neutral-110'
                  : 'text-neutral-80 hover:bg-neutral-20'
              )}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              <BodyS className="whitespace-nowrap">{opt}</BodyS>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
