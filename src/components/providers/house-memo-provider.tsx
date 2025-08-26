'use client';

import React from 'react';
import DefaultHouseMemoProvider from '@/contexts/HouseMemoContext';

export function HouseMemoProvider({ children }: { children: React.ReactNode }) {
  return <DefaultHouseMemoProvider>{children}</DefaultHouseMemoProvider>;
}
