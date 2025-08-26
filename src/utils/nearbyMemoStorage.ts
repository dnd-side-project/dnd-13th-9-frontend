import { NearbyMemo } from '@/types/nearby-memo';

const STORAGE_KEY = 'nearbyMemo';

export const getNearbyMemoFromStorage = (): NearbyMemo | null => {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to parse nearby memo from localStorage:', error);
    return null;
  }
};

export const saveNearbyMemoToStorage = (nearbyMemo: NearbyMemo): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nearbyMemo));
  } catch (error) {
    console.error('Failed to save nearby memo to localStorage:', error);
  }
};

export const clearNearbyMemoFromStorage = (): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear nearby memo from localStorage:', error);
  }
};

export const formatNearbyMemoForAPI = (nearbyMemo: NearbyMemo) => {
  return {
    title: nearbyMemo.title,
    description: nearbyMemo.description,
    placeTag: nearbyMemo.placeTag,
    address: nearbyMemo.address,
    latitude: nearbyMemo.latitude,
    longitude: nearbyMemo.longitude,
    folderId: nearbyMemo.folderId,
  };
};
