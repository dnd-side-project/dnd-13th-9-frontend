'use client';
import React from 'react';
import { Icon } from '@/components/ui/Icon';
import { BodyS } from '@/components/ui/Typography';

type Props = {
  onClick: () => void;
  className?: string;
};

export function CurrentLocationButton({ onClick, className = '' }: Props) {
  return (
    <button
      onClick={onClick}
      className={`absolute flex w-full items-center justify-end gap-0.5 ${className}`}
    >
      <Icon name="gps" width={15} />
      <BodyS className="text-primary-50 flex">현재 위치로 주소 입력</BodyS>
    </button>
  );
}
