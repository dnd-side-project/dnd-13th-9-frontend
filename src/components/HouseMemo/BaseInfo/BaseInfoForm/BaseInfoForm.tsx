'use client';
import React, { useRef } from 'react';
import { LabelContainer } from '../../LabelContainer';
import { Icon } from '@/components/ui/Icon';
import { Input } from '@/components/ui/Input';
import { ChipGroup } from '@/components/ui/ChipGroup';
import { CurrentLocationButton } from '@/components/ui/CurrentLocationButton';
import { KakaoMap } from '../Map';
import { useHouseMemo } from '@/contexts/HouseMemoContext';
import { feelingOptions, contractOptions, houseOptions, doubleInputFields } from './BaseInfoConfig';
import { ContractType, HouseType, Feeling, HouseMemo } from '@/types/house-memo';
import { createFieldUpdater } from '@/contexts/updateHouseMemoField';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import SearchMapBottomSheet from '@/components/map/Map/SearchMapBottomSheet';
import { TextArea } from '@/components/ui/TextArea';

export function BaseInfoForm() {
  const { houseMemo, setHouseMemo } = useHouseMemo();
  const handleFieldChange = createFieldUpdater(houseMemo, setHouseMemo);
  const [animatingIcon, setAnimatingIcon] = React.useState<Feeling | null>(null);

  const mapRef = useRef<any>(null);
  const { isOpen, open, close } = useBottomSheet();

  const handleIconClick = (type: Feeling) => {
    setAnimatingIcon(type);
    handleFieldChange('feeling', type);

    setTimeout(() => {
      setAnimatingIcon(null);
    }, 600);
  };

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

  const handleNumberInput = (
    fieldName: keyof Pick<
      HouseMemo,
      'depositBig' | 'depositSmall' | 'monthlyFee' | 'managementFee'
    >,
    value: string
  ) => {
    if (value === '') {
      setHouseMemo((prev) => {
        const newMemo = { ...prev };
        delete newMemo[fieldName];
        return newMemo;
      });
    } else {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        handleFieldChange(fieldName, numValue);
      }
    }
  };

  return (
    <div className="flex flex-col gap-8 py-5 pb-24">
      {/* 1. 전반적인 느낌 */}
      <LabelContainer label="전반적인 느낌" required>
        <div className="flex max-w-20 gap-2">
          {feelingOptions.map(({ type, iconName, unselectedIconName }) => (
            <Icon
              key={type}
              onClick={() => handleIconClick(type)}
              width={35}
              height={35}
              name={houseMemo.feeling === type ? iconName : unselectedIconName}
              className={`transform cursor-pointer transition-all duration-300 ease-out ${
                animatingIcon === type ? 'scale-125 rotate-3' : 'scale-100 rotate-0'
              }`}
            />
          ))}
        </div>
      </LabelContainer>

      {/* 2. 매물명 */}
      <LabelContainer label="매물명" required>
        <Input
          placeholder="지도에 표시될 제목을 입력하세요."
          value={houseMemo.propertyName || ''}
          onChange={(e) => handleFieldChange('propertyName', e.target.value)}
          maxLength={10}
          rightChildren={
            <span className="text-neutral-70 text-xs">{houseMemo.propertyName.length}/10</span>
          }
        />
      </LabelContainer>

      {/* 3. 메모 */}
      <LabelContainer label="메모">
        <TextArea
          placeholder="기억해두고 싶은 정보와 느낌을 작성하세요."
          value={houseMemo.memo || ''}
          onChange={(e) => handleFieldChange('memo', e.target.value)}
          showCounter
          maxLength={80}
        />
      </LabelContainer>

      {/* 4. 참고 링크 */}
      <LabelContainer label="참고 링크">
        <Input
          placeholder="부동산 앱에서 복사한 매물 링크를 붙여보세요."
          value={houseMemo.referenceUrl || ''}
          onChange={(e) => handleFieldChange('referenceUrl', e.target.value)}
        />
      </LabelContainer>

      {/* 5. 주소 */}
      <LabelContainer label="주소" required>
        <CurrentLocationButton className="-translate-x-1" onClick={handleMoveToCurrentLocation} />
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
          lat={
            houseMemo.latitude && houseMemo.latitude !== '' ? Number(houseMemo.latitude) : undefined
          }
          lng={
            houseMemo.longitude && houseMemo.longitude !== ''
              ? Number(houseMemo.longitude)
              : undefined
          }
        />
      </LabelContainer>

      {/* 6. 상세주소 */}
      <LabelContainer label="상세 주소">
        <Input
          placeholder="동/호수 등 상세 주소를 입력하세요."
          value={houseMemo.detailAddress || ''}
          onChange={(e) => handleFieldChange('detailAddress', e.target.value)}
        />
      </LabelContainer>

      {/* 7. 계약 형태 */}
      <LabelContainer label="계약 형태" required>
        <div className="flex gap-2">
          <ChipGroup
            activeChipColor="primary"
            options={contractOptions}
            value={houseMemo.contractType}
            onChange={(val) => {
              const newContractType = val as ContractType;
              // 전세나 매매로 변경될 때 monthlyFee를 undefined로 설정
              if (newContractType !== 'MONTHLY_RENT') {
                setHouseMemo((prev) => ({
                  ...prev,
                  contractType: newContractType,
                  monthlyFee: undefined,
                }));
              } else {
                handleFieldChange('contractType', newContractType);
              }
            }}
          />
        </div>
      </LabelContainer>

      {/* 8. 집 유형 */}
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

      {/* 9. 보증금 or 전세가 or 매매가 */}
      <LabelContainer
        label={
          houseMemo.contractType === 'MONTHLY_RENT'
            ? '보증금'
            : houseMemo.contractType === 'JEONSE'
              ? '전세가'
              : '매매가'
        }
      >
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

      {/* 10. 월세 */}
      {houseMemo.contractType === 'MONTHLY_RENT' && (
        <LabelContainer label="월세" required>
          <Input
            placeholder="예) 50"
            value={houseMemo.monthlyFee !== undefined ? String(houseMemo.monthlyFee) : ''}
            onChange={(e) => handleNumberInput('monthlyFee', e.target.value)}
            unit="만원"
          />
        </LabelContainer>
      )}

      {/* 11. 관리비 */}
      <LabelContainer label="관리비">
        <Input
          placeholder="예) 9"
          value={houseMemo.managementFee !== undefined ? String(houseMemo.managementFee) : ''}
          onChange={(e) => handleNumberInput('managementFee', e.target.value)}
          unit="만원"
        />
      </LabelContainer>

      {/* 12. 입주 가능 시기 */}
      <LabelContainer label="입주 가능 시기">
        <Input
          placeholder="예) 9월 초"
          value={houseMemo.moveInInfo || ''}
          onChange={(e) => handleFieldChange('moveInInfo', e.target.value)}
        />
      </LabelContainer>

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
