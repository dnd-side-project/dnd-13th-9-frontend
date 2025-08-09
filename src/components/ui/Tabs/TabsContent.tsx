import React from 'react';
import { useTabsContext } from './TabsContext';

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

export function TabsContent({ value, children }: TabsContentProps) {
  const context = useTabsContext();
  return context?.activeTab === value ? <div>{children}</div> : null;
}
