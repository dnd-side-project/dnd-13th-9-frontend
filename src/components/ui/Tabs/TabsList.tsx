'use client';
import React from 'react';

export function TabsList({ children }: React.PropsWithChildren<{}>) {
  return <div className="flex w-full gap-2">{children}</div>;
}
