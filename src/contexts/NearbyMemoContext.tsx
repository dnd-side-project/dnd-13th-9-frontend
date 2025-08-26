import { createContext, useContext, useEffect, useState } from 'react';
import { NearbyMemo } from '@/types/nearby-memo';
import { ReactNode } from 'react';

const STORAGE_KEY = 'nearbyMemo';

export const initialNearbyMemo: NearbyMemo = {
  title: '',
  description: '',
  placeTag: 'STRENGTH',
  address: '',
  latitude: 0,
  longitude: 0,
  folderId: 0,
};

const getNearbyMemoFromStorage = (): NearbyMemo => {
  if (typeof window === 'undefined') return initialNearbyMemo;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...initialNearbyMemo, ...JSON.parse(stored) } : initialNearbyMemo;
  } catch (error) {
    console.error('Failed to parse nearby memo from localStorage:', error);
    return initialNearbyMemo;
  }
};

const saveNearbyMemoToStorage = (nearbyMemo: NearbyMemo): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nearbyMemo));
  } catch (error) {
    console.error('Failed to save nearby memo to localStorage:', error);
  }
};

interface NearbyMemoContextType {
  nearbyMemo: NearbyMemo;
  setNearbyMemo: React.Dispatch<React.SetStateAction<NearbyMemo>>;
  clearNearbyMemo: () => void;
}

export const NearbyMemoContext = createContext<NearbyMemoContextType>({
  nearbyMemo: initialNearbyMemo,
  setNearbyMemo: () => {},
  clearNearbyMemo: () => {},
});

export const useNearbyMemo = (): NearbyMemoContextType => {
  const context = useContext(NearbyMemoContext);
  if (!context) {
    throw new Error('useNearbyMemo must be used within a NearbyMemoProvider');
  }
  return context;
};

type Props = {
  children: ReactNode;
};

export default function NearbyMemoProvider({ children }: Props) {
  const [nearbyMemo, setNearbyMemo] = useState<NearbyMemo>(initialNearbyMemo);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      const storedNearbyMemo = getNearbyMemoFromStorage();
      setNearbyMemo(storedNearbyMemo);
      setIsInitialized(true);
    }
  }, [isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      saveNearbyMemoToStorage(nearbyMemo);
    }
  }, [nearbyMemo, isInitialized]);

  const clearNearbyMemo = () => {
    setNearbyMemo(initialNearbyMemo);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <NearbyMemoContext.Provider value={{ nearbyMemo, setNearbyMemo, clearNearbyMemo }}>
      {children}
    </NearbyMemoContext.Provider>
  );
}
