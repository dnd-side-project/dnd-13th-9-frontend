import { HouseMemo } from '@/types/house-memo';

const STORAGE_KEY = 'houseMemo';

export const getHouseMemoFromStorage = (): HouseMemo | null => {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to parse house memo from localStorage:', error);
    return null;
  }
};

export const saveHouseMemoToStorage = (houseMemo: HouseMemo): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(houseMemo));
  } catch (error) {
    console.error('Failed to save house memo to localStorage:', error);
  }
};

export const clearHouseMemoFromStorage = (): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear house memo from localStorage:', error);
  }
};

// export const validateHouseMemo = (houseMemo: Partial<HouseMemo>): boolean => {

// };

export const formatHouseMemoForAPI = (houseMemo: HouseMemo) => {
  return {
    feeling: houseMemo.feeling,
    propertyName: houseMemo.propertyName,
    memo: houseMemo.memo,
    referenceUrl: houseMemo.referenceUrl,
    address: houseMemo.address,
    detailAddress: houseMemo.detailAddress,
    longitude: houseMemo.longitude,
    latitude: houseMemo.latitude,
    contractType: houseMemo.contractType,
    houseType: houseMemo.houseType,
    depositBig: houseMemo.depositBig,
    depositSmall: houseMemo.depositSmall,
    managementFee: houseMemo.managementFee,
    moveInInfo: houseMemo.moveInInfo,
    categoryMemoList: houseMemo.categoryMemoList,
    folderId: houseMemo.folderId,
  };
};
