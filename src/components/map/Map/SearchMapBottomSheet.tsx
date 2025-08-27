'use client';
import React, { useState } from 'react';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { TitleM, BodyXl } from '@/components/ui/Typography';
import PlaceSearch from '@/components/HouseMemo/BaseInfo/Map/PlaceSearch';
import { PlaceAddress } from '@/types/nearby-memo';

type Props = {
  existAddress?: PlaceAddress;
  onSelect: (address: PlaceAddress) => void;
  isOpen: boolean;
  closeModal: () => void;
};

export default function SearchMapBottomSheet({ onSelect, isOpen, closeModal }: Props) {
  const [searchValue, setSearchValue] = useState('');

  return (
    <BottomSheet
      isOpen={isOpen}
      closeModal={closeModal}
      className="left-1/2 h-[600px] w-full max-w-[450px] -translate-x-1/2"
    >
      <div className="flex flex-col gap-2 p-5">
        <TitleM>이 집의 주소를 알려주세요</TitleM>

        <BodyXl className="text-neutral-70">
          주소를 모르겠다면, 우선 주변 장소로 입력해보세요.
        </BodyXl>

        <PlaceSearch
          value={searchValue}
          onChange={setSearchValue}
          onSelect={(place) => {
            onSelect({
              x: place.x,
              y: place.y,
              address: place.address_name,
              place_name: place.place_name,
            });
            closeModal();
          }}
        />
      </div>
    </BottomSheet>
  );
}
