import { createContext, useContext } from 'react';
import { HouseMemo } from '@/types/house-memo';

export const initialHouseMemo: HouseMemo = {
  feeling: 'HAPPY',
  propertyName: '',
  memo: '',
  referenceLink: '',
  address: '',
  detailedAddress: '',
  contractType: '월세',
  houseType: '오피스텔',
  depositSmall: '',
  depositBig: '',
  monthlyRent: '',
  maintenanceFee: '',
  availableDate: '',
};

interface HouseMemoContextType {
  houseMemo: HouseMemo;
  setHouseMemo: React.Dispatch<React.SetStateAction<HouseMemo>>;
}

export const HouseMemoContext = createContext<HouseMemoContextType>({
  houseMemo: initialHouseMemo,
  setHouseMemo: () => {},
});

export const useHouseMemo = (): HouseMemoContextType => {
  const context = useContext(HouseMemoContext);
  if (!context) {
    throw new Error('useHouseMemo must be used within a HouseMemoProvider');
  }
  return context;
};
