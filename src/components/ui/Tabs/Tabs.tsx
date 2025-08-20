'use client';
import React, { useState } from 'react';
import { TabsContext } from './TabsContext';

type TabsProps = {
  defaultValue: string;
  children?: React.ReactNode;
};

export function Tabs({ defaultValue, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}
