'use client';
import React, { useState, useRef } from 'react';
import { MainLayout } from '@/components/layout';
import { Input } from '@/components/ui/Input';
import { Icon } from '@/components/ui/Icon';
import { KakaoMap } from '@/components/HouseMemo/BaseInfo/Map';
import { TitleM } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { useBottomSheet } from '@/hooks/useBottomSheet';
import { TitleXs } from '@/components/ui/Typography';
import PlaceSearch from '@/components/HouseMemo/BaseInfo/Map/PlaceSearch';

export default function Page() {
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { isOpen, open, close } = useBottomSheet(false);

  return (
    <MainLayout>
      <div className="relative w-full justify-center px-3 py-3 pl-12">
        <Input
          ref={inputRef}
          placeholder="지도에 표시할 장소를 검색해보세요."
          value={''}
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

      <KakaoMap height={'1200px'} />

      <div className="flex h-60 flex-col items-center justify-center gap-6 py-12 pt-10">
        <TitleM className="w-full px-6">상단 검색창으로 주소를 찾아주세요</TitleM>
        <Button size="large" label="이 위치로 주소 입력" disabled={true} />
      </div>
      <BottomSheet
        isOpen={isOpen}
        closeModal={close}
        className="left-1/2 h-[600px] w-full max-w-[450px] -translate-x-1/2"
      >
        <div className="flex flex-col gap-4 p-5">
          <TitleM>이 집의 주소를 알려주세요</TitleM>
          <TitleXs>주소를 모르겠다면, 우선 주변 장소로 입력해보세요.</TitleXs>

          <PlaceSearch
            value={searchValue}
            onChange={setSearchValue}
            onSelect={(place) => {
              console.log('선택한 장소:', place);
              close();
            }}
          />
        </div>
      </BottomSheet>
    </MainLayout>
  );
}
