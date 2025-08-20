'use client';
import React from 'react';
import { cn } from '@/utils/utils';

type TabsListProps = React.PropsWithChildren<{
  className?: string;
}>;

export function TabsList({ children, className }: TabsListProps) {
  return <div className={cn('flex w-full gap-2', className)}>{children}</div>;
}
