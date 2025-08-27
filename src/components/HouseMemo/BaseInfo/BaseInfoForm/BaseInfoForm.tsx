'use client';
import React, { useRef } from 'react';
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
import { useBottomSheet } from '@/hooks/useBottomSheet';
import SearchMapBottomSheet from '@/components/map/Map/SearchMapBottomSheet';

export function BaseInfoForm() {
  const { houseMemo, setHouseMemo } = useHouseMemo();
  const handleFieldChange = createFieldUpdater(houseMemo, setHouseMemo);

  const mapRef = useRef<any>(null);
  const { isOpen, open, close } = useBottomSheet();

  const handleMoveToCurrentLocation = async () => {
    if (mapRef.current) {
      const info = await mapRef.current.moveToCurrentLocation();
      if (info) {
        setHouseMemo((prev) => ({
          ...prev,
          address: info.address || '',
          longitude: String(info.lng),
          latitude: String(info.lat),
        }));
      }
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
      <LabelContainer label="계약 형태" required>
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
            value={houseMemo.houseType || ''}
            onChange={(val) => handleFieldChange('houseType', val as HouseType)}
            activeChipColor="primary"
          />
        </div>
      </LabelContainer>

      {/* 보증금 */}
      <LabelContainer label="보증금">
        <div className="flex gap-2">
          {doubleInputFields.map(({ key, placeholder, unit }) => (
            <Input
              key={key}
              placeholder={placeholder}
              value={houseMemo[key] !== undefined ? String(houseMemo[key]) : ''}
              onChange={(e) => handleFieldChange(key, Number(e.target.value))}
              unit={unit}
              className="w-30 max-w-47"
            />
          ))}
        </div>
      </LabelContainer>

      {/* 주소 */}
      <LabelContainer label="주소" required>
        <CurrentLocationButton className="-translate-x-12" onClick={handleMoveToCurrentLocation} />
        <Input
          placeholder="현재 위치 버튼을 클릭하거나 지도를 터치하여 주소를 선택하세요."
          value={houseMemo.address || ''}
          onChange={() => {}}
          onClick={open}
          readOnly
        />
        <KakaoMap
          ref={mapRef}
          height="130px"
          lat={houseMemo.latitude && houseMemo.latitude !== '' ? houseMemo.latitude : undefined}
          lng={houseMemo.longitude && houseMemo.longitude !== '' ? houseMemo.longitude : undefined}
        />
      </LabelContainer>

      {/* 나머지 입력 필드들 */}
      {InputFields.filter((field) => field.key !== 'address').map(
        ({ key, label, placeholder, required, unit }) => (
          <LabelContainer key={key} label={label} required={required}>
            <Input
              placeholder={placeholder}
              value={houseMemo[key] as string}
              onChange={(e) => handleFieldChange(key, e.target.value)}
              unit={unit}
            />
          </LabelContainer>
        )
      )}

      {isOpen && (
        <SearchMapBottomSheet
          existAddress={
            houseMemo.address
              ? {
                  address: houseMemo.address,
                  place_name: houseMemo.address,
                  x: houseMemo.longitude,
                  y: houseMemo.latitude,
                }
              : undefined
          }
          isOpen={isOpen}
          closeModal={close}
          onSelect={(address) => {
            console.log('지도에서 주소 선택:', address);
            setHouseMemo((prev) => ({
              ...prev,
              address: address.address || '',
              longitude: String(address.x),
              latitude: String(address.y),
            }));
          }}
        />
      )}
    </div>
  );
}
