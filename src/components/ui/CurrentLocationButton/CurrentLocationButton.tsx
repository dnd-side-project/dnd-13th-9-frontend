'use client';
import React from 'react';
import { Icon } from '@/components/ui/Icon';
import { BodyS } from '@/components/ui/Typography';
import { cn } from '@/utils/utils';

type Props = {
  onClick: () => void;
  className?: string;
  color?: 'primary' | 'secondary';
};

export function CurrentLocationButton({ onClick, className = '', color = 'primary' }: Props) {
  const textColor = color === 'primary' ? 'text-primary-50' : 'text-secondary-50';

  return (
    <button
      onClick={onClick}
      className={cn('absolute flex w-full items-center justify-end gap-0.5', className)}
    >
      <Icon name="gps" width={15} color={'secondary'} />
      <BodyS className={cn('flex', textColor)}>현재 위치로 주소 입력</BodyS>
    </button>
  );
}
