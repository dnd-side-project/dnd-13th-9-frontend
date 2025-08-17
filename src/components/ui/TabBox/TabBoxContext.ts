'use client';

import React, { createContext, useContext } from 'react';

export type TabBoxContextValue = {
  activeValue: string;
  setActiveValue: (val: string) => void;
};

export const TabBoxContext = createContext<TabBoxContextValue | null>(null);

export function useTabBoxContext() {
  const ctx = useContext(TabBoxContext);
  if (!ctx) return null;
  return ctx;
}
