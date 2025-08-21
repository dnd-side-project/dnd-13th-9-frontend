'use client';

import React, { useState } from 'react';
import { HouseMemoContext, initialHouseMemo } from '@/contexts/HouseMemoContext';

export function HouseMemoProvider({ children }: { children: React.ReactNode }) {
  const [houseMemo, setHouseMemo] = useState(initialHouseMemo);

  return (
    <HouseMemoContext.Provider value={{ houseMemo, setHouseMemo }}>
      {children}
    </HouseMemoContext.Provider>
  );
}
