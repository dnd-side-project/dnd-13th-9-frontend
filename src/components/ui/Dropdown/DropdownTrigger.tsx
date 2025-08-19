import React from 'react';
import { useDropdown } from './Dropdown.Context';
import { TitleM } from '../Typography';
import { Icon } from '../Icon';
import { cn } from '@/utils/utils';

type Props = {
  title: string;
  className?: string;
};

export function DropdownTrigger({ title, className }: Props) {
  const { isOpen, setIsOpen } = useDropdown();

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={cn('flex w-full justify-between rounded-2xl bg-white px-5 py-2', className)}
    >
      <TitleM className="whitespace-nowrap">{title}</TitleM>
      <Icon name="arrowDown" />
    </button>
  );
}
