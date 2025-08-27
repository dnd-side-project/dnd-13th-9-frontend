'use client';
import React, { useState } from 'react';
import { TabsContext } from './TabsContext';

type Props = {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
};

export function Tabs({ defaultValue, value, onValueChange, children }: Props) {
  const [internalActiveTab, setInternalActiveTab] = useState(defaultValue || value || '');

  const activeTab = value !== undefined ? value : internalActiveTab;
  const setActiveTab = (newValue: string) => {
    if (onValueChange) {
      onValueChange(newValue);
    } else {
      setInternalActiveTab(newValue);
    }
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}
