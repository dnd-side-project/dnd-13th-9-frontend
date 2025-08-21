'use client';
import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { LabelContainer } from '../../LabelContainer';
import { Icon } from '@/components/ui/Icon';
import { Input } from '@/components/ui/Input';
import { ChipGroup } from '@/components/ui/ChipGroup';
import { CurrentLocationButton } from '@/components/ui/CurrentLocationButton';
import { KakaoMap } from '../Map';
import { useHouseMemo } from '@/contexts/HouseMemoContext';
import {
  feelingOptions,
  InputFields,
  contractOptions,
  houseOptions,
  doubleInputFields,
} from './BaseInfoConfig';
import { ContractType, HouseType } from '@/types/house-memo';
import { createFieldUpdater } from '@/contexts/updateHouseMemoField';

export function BaseInfoForm() {
  const { houseMemo, setHouseMemo } = useHouseMemo();
  const handleFieldChange = createFieldUpdater(houseMemo, setHouseMemo);
  const router = useRouter();

  const mapRef = useRef<any>(null);

  const handleMoveToCurrentLocation = () => {
    if (mapRef.current) {
      mapRef.current.moveToCurrentLocation();
    }
  };

  return (
    <div className="flex flex-col gap-8 py-5 pb-24">
      {/* 전반적인 느낌 */}
      <LabelContainer label="전반적인 느낌">
        <div className="flex max-w-20 gap-2">
          {feelingOptions.map(({ type, iconName, activeColor }) => (
            <Icon
              key={type}
              onClick={() => handleFieldChange('feeling', type)}
              width={40}
              height={40}
              color={houseMemo.feeling === type ? activeColor : 'neutral'}
              name={iconName}
            />
          ))}
        </div>
      </LabelContainer>

      {/* 계약 형태 */}
      <LabelContainer label="계약 형태" required={true}>
        <div className="flex gap-2">
          <ChipGroup
            activeChipColor="primary"
            options={contractOptions}
            value={houseMemo.contractType}
            onChange={(val) => handleFieldChange('contractType', val as ContractType)}
          />
        </div>
      </LabelContainer>

      {/* 집 유형 */}
      <LabelContainer label="집 유형">
        <div className="flex flex-wrap gap-2">
          <ChipGroup
            options={houseOptions}
            value={houseMemo.houseType}
            onChange={(val) => handleFieldChange('houseType', val as HouseType)}
            activeChipColor="primary"
          />
        </div>
      </LabelContainer>

      <LabelContainer label="보증금">
        <div className="flex gap-2">
          {doubleInputFields.map(({ key, placeholder, unit }) => (
            <Input
              placeholder={placeholder}
              value={houseMemo[key] !== undefined ? String(houseMemo[key]) : ''}
              onChange={(e) => handleFieldChange(key, e.target.value)}
              unit={unit}
              className="max-w-47"
            />
          ))}
        </div>
      </LabelContainer>

      {InputFields.map(({ key, label, placeholder, required, unit }) => (
        <LabelContainer key={key} label={label} required={required}>
          {key === 'address' ? (
            <>
              <CurrentLocationButton onClick={handleMoveToCurrentLocation} />
              <Input
                placeholder={placeholder}
                value={houseMemo.address?.address_name || houseMemo.address?.place_name || ''}
                onChange={(_) => {}}
                onClick={() => router.push('/map/house-memo/search-map')}
                readOnly
              />
              <KakaoMap ref={mapRef} height="130px" />
            </>
          ) : (
            <Input
              placeholder={placeholder}
              value={houseMemo[key] as string}
              onChange={(e) => handleFieldChange(key, e.target.value)}
              unit={unit}
            />
          )}
        </LabelContainer>
      ))}
    </div>
  );
}
