'use client';
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MainLayout } from '@/components/layout';
import { Input } from '@/components/ui/Input';
import { Icon } from '@/components/ui/Icon';
import { KakaoMap } from '@/components/HouseMemo/BaseInfo/Map';
import { TitleM, BodyXl } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import PlaceSearch from '@/components/HouseMemo/BaseInfo/Map/PlaceSearch';
import { useHouseMemo } from '@/contexts/HouseMemoContext';
import { Address } from '@/types/house-memo';

export default function Page() {
  const { houseMemo, setHouseMemo } = useHouseMemo();
  const router = useRouter();

  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { isOpen, open, close } = useBottomSheet(false);

  const [tempAddress, setTempAddress] = useState<Address | null>(null);

  const [tempDetailedAddress, setTempDetailedAddress] = useState('');

  const displayPlaceName = tempAddress?.place_name ?? houseMemo.address?.place_name;
  const displayAddressName = tempAddress?.address_name ?? houseMemo.address?.address_name;

  return (
    <MainLayout>
      <div className="relative w-full justify-center px-3 py-3 pl-12">
        <Input
          ref={inputRef}
          placeholder="지도에 표시할 장소를 검색해보세요."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={open}
          rightChildren={
            <Icon
              name="search"
              className="pointer-events-none absolute top-1/2 -translate-y-1/2"
              width={20}
              height={25}
            />
          }
        />
      </div>

      <KakaoMap height="1200px" />

      <div className="flex h-60 w-full flex-col items-center justify-center gap-6 px-6 py-10 pb-10">
        {displayPlaceName ? (
          <TitleM className="w-full">{displayPlaceName}</TitleM>
        ) : (
          <TitleM className="w-full">상단 검색창으로 주소를 찾아주세요</TitleM>
        )}

        {displayAddressName && (
          <BodyXl className="text-neutral-70 w-full">{displayAddressName}</BodyXl>
        )}

        <Input
          placeholder="동/호수 등 상세 주소를 입력하세요."
          value={tempDetailedAddress}
          onChange={(e) => setTempDetailedAddress(e.target.value)}
          className="flex w-full justify-center px-4"
        />

        <Button
          size="large"
          label="이 위치로 주소 입력"
          disabled={!tempAddress?.place_name}
          onClick={() => {
            if (!tempAddress) return;

            setHouseMemo({
              ...houseMemo,
              address: tempAddress,
              detailAddress: tempDetailedAddress,
            });

            setTempAddress(null);
            setTempDetailedAddress('');
            router.back();
          }}
        />
      </div>

      <BottomSheet
        isOpen={isOpen}
        closeModal={close}
        className="left-1/2 h-[600px] w-full max-w-[450px] -translate-x-1/2"
      >
        <div className="flex flex-col gap-2 p-5">
          {houseMemo.address?.address_name ? (
            <div>{houseMemo.address.address_name}</div>
          ) : (
            <TitleM>이 집의 주소를 알려주세요</TitleM>
          )}

          {houseMemo.address?.place_name ? (
            <div>{houseMemo.address.place_name}</div>
          ) : (
            <BodyXl className="text-neutral-70">
              주소를 모르겠다면, 우선 주변 장소로 입력해보세요.
            </BodyXl>
          )}

          <PlaceSearch
            value={searchValue}
            onChange={setSearchValue}
            onSelect={(place) => {
              setTempAddress({
                x: place.x,
                y: place.y,
                address_name: place.address_name,
                place_name: place.place_name,
              });
              close();
            }}
          />
        </div>
      </BottomSheet>
    </MainLayout>
  );
}
