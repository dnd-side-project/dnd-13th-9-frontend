import { createContext, useContext } from 'react';

type TabsContextType = {
  activeTab: string;
  setActiveTab: (value: string) => void;
};

export const TabsContext = createContext<TabsContextType | undefined>(undefined);

export function useTabsContext() {
  const context = useContext(TabsContext);

  return context;
}
