'use client';
import React from 'react';
import { cn } from '@/utils/utils';
import { Icon } from '@/components/ui/Icon';

export type HeaderProps = {
  title?: string;
  center?: React.ReactNode;
  left?: React.ReactNode;
  leftBack?: boolean;
  right?: React.ReactNode;
  className?: string;
};

export const Header: React.FC<HeaderProps> = ({
  title,
  center,
  left,
  leftBack,
  right,
  className,
}) => {
  const defaultBack = () => typeof window !== 'undefined' && window.history.back();

  const leftNode = leftBack ? (
    <button
      type="button"
      aria-label="back"
      onClick={defaultBack}
      className="inline-flex cursor-pointer items-center justify-center rounded-xl"
    >
      <Icon name="arrowLeft" size={24} padding={10} />
    </button>
  ) : left != null ? (
    left
  ) : null;

  return (
    <header
      className={cn('sticky top-0 left-0 z-20 w-full border-black/5 bg-white', className)}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className={cn('flex w-full items-center justify-between px-2')} style={{ height: 56 }}>
        <div className="flex w-11 items-center justify-start">{leftNode}</div>

        <div className="flex flex-1 items-center justify-center">
          {center ??
            (title ? (
              <span className="max-w-[70%] truncate text-base font-medium">{title}</span>
            ) : null)}
        </div>

        <div className="flex w-11 items-center justify-end gap-1">{right ?? null}</div>
      </div>
    </header>
  );
};
