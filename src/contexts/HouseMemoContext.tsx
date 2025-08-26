import { createContext, useContext, useEffect, useState } from 'react';
import { HouseMemo } from '@/types/house-memo';
import { ReactNode } from 'react';

const STORAGE_KEY = 'houseMemo';

export const initialHouseMemo: HouseMemo = {
  propertyName: '',
  address: '',
  longitude: '',
  latitude: '',
  contractType: 'MONTHLY_RENT',
  depositBig: 0,
  depositSmall: 0,
  folderId: 1,
  categoryMemoList: [],
};

const getHouseMemoFromStorage = (): HouseMemo => {
  if (typeof window === 'undefined') return initialHouseMemo;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...initialHouseMemo, ...JSON.parse(stored) } : initialHouseMemo;
  } catch (error) {
    console.error('Failed to parse house memo from localStorage:', error);
    return initialHouseMemo;
  }
};

const saveHouseMemoToStorage = (houseMemo: HouseMemo): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(houseMemo));
  } catch (error) {
    console.error('Failed to save house memo to localStorage:', error);
  }
};

interface HouseMemoContextType {
  houseMemo: HouseMemo;
  setHouseMemo: React.Dispatch<React.SetStateAction<HouseMemo>>;
  clearHouseMemo: () => void;
}

export const HouseMemoContext = createContext<HouseMemoContextType>({
  houseMemo: initialHouseMemo,
  setHouseMemo: () => {},
  clearHouseMemo: () => {},
});

export const useHouseMemo = (): HouseMemoContextType => {
  const context = useContext(HouseMemoContext);
  if (!context) {
    throw new Error('useHouseMemo must be used within a HouseMemoProvider');
  }
  return context;
};

type Props = {
  children: ReactNode;
};

export default function HouseMemoProvider({ children }: Props) {
  const [houseMemo, setHouseMemo] = useState<HouseMemo>(initialHouseMemo);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      const storedHouseMemo = getHouseMemoFromStorage();
      setHouseMemo(storedHouseMemo);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      saveHouseMemoToStorage(houseMemo);
    }
  }, [houseMemo, isInitialized]);

  const clearHouseMemo = () => {
    setHouseMemo(initialHouseMemo);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <HouseMemoContext.Provider value={{ houseMemo, setHouseMemo, clearHouseMemo }}>
      {children}
    </HouseMemoContext.Provider>
  );
}
