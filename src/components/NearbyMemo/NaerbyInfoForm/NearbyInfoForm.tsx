'use client';

import React, { useRef } from 'react';
import { LabelContainer } from '@/components/HouseMemo/LabelContainer';
import { Input } from '@/components/ui/Input';
import { TextArea } from '@/components/ui/TextArea';
import { CurrentLocationButton } from '@/components/ui/CurrentLocationButton';
import { KakaoMap } from '@/components/HouseMemo/BaseInfo/Map';
import { InputFields, placeTagOptions } from './NearbyInfoConfig';
import { PlaceTag } from '@/types/nearby-memo';
import { ChipGroup } from '@/components/ui/ChipGroup';
import SearchMapBottomSheet from '@/components/map/Map/SearchMapBottomSheet';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import { useNearbyMemo } from '@/contexts';

export function NearbyInfoForm() {
  const { nearbyMemo, setNearbyMemo } = useNearbyMemo();
  const mapRef = useRef<any>(null);
  const { isOpen, open, close } = useBottomSheet();

  const handleMoveToCurrentLocation = async () => {
    if (mapRef.current) {
      const info = await mapRef.current.moveToCurrentLocation();
      if (info) {
        setNearbyMemo((prev) => ({
          ...prev,
          address: info.address,
          latitude: info.lat,
          longitude: info.lng,
        }));
      }
    }
  };

  const handleFieldChange = <K extends keyof typeof nearbyMemo>(
    key: K,
    value: (typeof nearbyMemo)[K]
  ) => {
    setNearbyMemo((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-8 px-6 py-5 pb-24">
      {/* 장소 태그 선택 */}
      <LabelContainer label="장소 태그" className="w-100 gap-3">
        <ChipGroup
          activeChipColor="secondary"
          options={placeTagOptions}
          value={nearbyMemo.placeTag}
          iconName={(optionValue, isActive) => {
            if (isActive) {
              switch (optionValue) {
                case 'ADVANTAGE':
                  return 'advantageFill';
                case 'DISADVANTAGE':
                  return 'disadvantageFill';
                case 'CONVENIENCE':
                  return 'convenienceFill';
                case 'TRANSPORTATION':
                  return 'transportationFill';
                case 'SECURITY':
                  return 'security';
                case 'NOISE':
                  return 'noiseFill';
                default:
                  return 'example';
              }
            } else {
              switch (optionValue) {
                case 'ADVANTAGE':
                  return 'advantage';
                case 'DISADVANTAGE':
                  return 'disadvantage';
                case 'CONVENIENCE':
                  return 'convenience';
                case 'TRANSPORTATION':
                  return 'transportation';
                case 'SECURITY':
                  return 'securityOutline';
                case 'NOISE':
                  return 'noise';
                default:
                  return 'example';
              }
            }
          }}
          onChange={(val) => handleFieldChange('placeTag', val as PlaceTag)}
        />
      </LabelContainer>

      {/* 장소명, 메모, 주소 */}
      {InputFields.map(({ key, label, placeholder, required, unit }) => (
        <LabelContainer key={key} label={label} required={required}>
          {key === 'address' ? (
            <>
              <CurrentLocationButton
                onClick={handleMoveToCurrentLocation}
                className="-translate-x-1"
                color="secondary"
              />
              <Input
                placeholder={placeholder}
                value={nearbyMemo.address}
                onChange={(e) => handleFieldChange('address', e.target.value)}
                onClick={open}
                readOnly
              />
              <KakaoMap
                type="NEARBY"
                ref={mapRef}
                height="130px"
                lat={nearbyMemo.latitude}
                lng={nearbyMemo.longitude}
              />
            </>
          ) : key === 'description' ? (
            <TextArea
              placeholder={placeholder}
              value={nearbyMemo[key] as string}
              onChange={(e) => handleFieldChange(key as keyof typeof nearbyMemo, e.target.value)}
              maxLength={80}
              showCounter
            />
          ) : key === 'title' ? (
            <Input
              placeholder={placeholder}
              value={nearbyMemo[key] as string}
              onChange={(e) => handleFieldChange(key as keyof typeof nearbyMemo, e.target.value)}
              unit={unit}
              maxLength={10}
              rightChildren={
                <span className="text-neutral-70 text-xs">{nearbyMemo.title.length}/10</span>
              }
            />
          ) : (
            <Input
              placeholder={placeholder}
              value={nearbyMemo[key] as string}
              onChange={(e) => handleFieldChange(key as keyof typeof nearbyMemo, e.target.value)}
              unit={unit}
            />
          )}
        </LabelContainer>
      ))}

      {isOpen && (
        <SearchMapBottomSheet
          isOpen={isOpen}
          closeModal={close}
          onSelect={(address) => {
            handleFieldChange('address', address.address);
            handleFieldChange('latitude', Number(address.y));
            handleFieldChange('longitude', Number(address.x));
          }}
        />
      )}
    </div>
  );
}
