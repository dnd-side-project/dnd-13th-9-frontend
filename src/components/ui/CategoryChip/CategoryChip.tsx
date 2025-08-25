'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/utils/utils';
import { BodyS } from '@/components/ui/Typography';
import { Icon } from '@/components/ui/Icon/Icon';

type ChipOption = string | { id: string | number; label: string };

type Props = {
  options: readonly ChipOption[];
  value?: string | number;
  placeholder?: string;
  onChange: (value: string | number) => void;
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

  const items = useMemo(
    () =>
      options.map((opt) =>
        typeof opt === 'string' ? { id: opt, label: opt } : { id: opt.id, label: opt.label }
      ),
    [options]
  );

  const selectedLabel = useMemo(() => {
    if (value === undefined || value === null) return placeholder;
    const found = items.find((i) => i.id === value);
    return found ? found.label : placeholder;
  }, [items, value, placeholder]);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    if (!open) return;

    const handlePointer = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (target && wrapperRef.current && !wrapperRef.current.contains(target)) {
        setOpen(false);
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handlePointer, true);
    document.addEventListener('touchstart', handlePointer, true);
    document.addEventListener('keydown', handleKey, true);
    return () => {
      document.removeEventListener('mousedown', handlePointer, true);
      document.removeEventListener('touchstart', handlePointer, true);
      document.removeEventListener('keydown', handleKey, true);
    };
  }, [open]);

  return (
    <div className={cn('relative inline-block', className)} ref={wrapperRef} {...props}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'box-border inline-flex items-center gap-1 rounded-3xl border px-4 py-2',
          value !== undefined && value !== null
            ? 'border-primary-55 text-primary-55 bg-coolGray-20'
            : 'border-neutral-40 text-neutral-80 bg-white'
        )}
      >
        <BodyS className="whitespace-nowrap">{selectedLabel}</BodyS>
        <div className={cn('icon-rotate', open && 'icon-rotate-open')}>
          <Icon
            name="spinnerDown"
            size={18}
            color={value !== undefined && value !== null ? 'primary' : 'neutral'}
          />
        </div>
      </button>

      <div
        className={cn(
          'reveal-panel absolute left-0 z-50 min-w-[140px] overflow-hidden rounded-xl bg-white py-2 shadow-md',
          'top-[calc(100%+22px)]',
          open ? 'reveal-panel-open' : 'reveal-panel-closed'
        )}
        aria-hidden={!open}
      >
        {items.map((opt) => (
          <button
            key={String(opt.id)}
            type="button"
            className={cn(
              'flex w-full items-center px-4 py-3 text-left',
              opt.id === value
                ? 'bg-coolGray-20 text-primary-55'
                : 'text-neutral-80 hover:bg-neutral-20'
            )}
            onClick={() => {
              onChange(opt.id);
              setOpen(false);
            }}
          >
            <BodyS className="whitespace-nowrap">{opt.label}</BodyS>
          </button>
        ))}
      </div>
    </div>
  );
}
