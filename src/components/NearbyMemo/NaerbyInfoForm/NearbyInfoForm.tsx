'use client';

import React, { useRef, useState } from 'react';
import { LabelContainer } from '@/components/HouseMemo/LabelContainer';
import { Input } from '@/components/ui/Input';
import { CurrentLocationButton } from '@/components/ui/CurrentLocationButton';
import { KakaoMap } from '@/components/HouseMemo/BaseInfo/Map';
import { InputFields, placeTagOptions } from './NearbyInfoConfig';
import { PlaceTag, NearbyMemo } from '@/types/nearby-memo';
import { ChipGroup } from '@/components/ui/ChipGroup';
import SearchMapBottomSheet from '@/components/map/Map/SearchMapBottomSheet';

export function NearbyInfoForm() {
  const [nearbyInfo, setNearbyInfo] = useState<NearbyMemo>({
    placeName: '',
    memo: '',
    tags: '장점',
    address: null,
  });

  const mapRef = useRef<any>(null);
  const [isOpenSearchMap, setIsOpenSearchMap] = useState(false);

  const handleMoveToCurrentLocation = async () => {
    if (mapRef.current) {
      const info = await mapRef.current.moveToCurrentLocation();
    }
  };

  const handleFieldChange = (key: keyof NearbyMemo, value: any) => {
    setNearbyInfo((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col gap-8 py-5 pb-24">
      {/* 장소 태그 선택 */}
      <LabelContainer label="장소 태그" className="w-100 gap-3">
        <ChipGroup
          activeChipColor="secondary"
          options={placeTagOptions}
          value={nearbyInfo.tags}
          iconName="example"
          onChange={(val) => handleFieldChange('tags', val as PlaceTag)}
        />
      </LabelContainer>

      {/* 장소명, 메모, 주소 */}
      {InputFields.map(({ key, label, placeholder, required, unit }) => (
        <LabelContainer key={key} label={label} required={required}>
          {key === 'address' ? (
            <>
              <CurrentLocationButton
                onClick={handleMoveToCurrentLocation}
                className="-translate-x-14"
                color="secondary"
              />
              <Input
                placeholder={placeholder}
                value={nearbyInfo.address?.address_name || nearbyInfo.address?.place_name || ''}
                onChange={() => {}}
                onClick={() => setIsOpenSearchMap(true)}
                readOnly
              />
              <KakaoMap
                ref={mapRef}
                height="130px"
                x={nearbyInfo.address?.x}
                y={nearbyInfo.address?.y}
              />
            </>
          ) : (
            <Input
              placeholder={placeholder}
              value={nearbyInfo[key] as string}
              onChange={(e) => handleFieldChange(key as keyof NearbyMemo, e.target.value)}
              unit={unit}
            />
          )}
        </LabelContainer>
      ))}

      {isOpenSearchMap && (
        <SearchMapBottomSheet
          existAddress={nearbyInfo.address || undefined}
          isOpen={isOpenSearchMap}
          closeModal={() => setIsOpenSearchMap(false)}
          onSelect={(address) => {
            handleFieldChange('address', address);
          }}
        />
      )}
    </div>
  );
}
