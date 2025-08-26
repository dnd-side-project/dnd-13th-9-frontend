'use client';

import React from 'react';
import { Input } from '@/components/ui/Input';
import { Icon } from '@/components/ui/Icon';
import { usePlacesQuery } from '@/queries/houseMemo/usePlacesQuery';
import { Place } from '@/services/house.memo';
import { useHouseMemo } from '@/contexts/HouseMemoContext';

type PlaceSearchProps = {
  value: string;
  onChange: (value: string) => void;
  onSelect: (place: Place) => void;
};

export default function PlaceSearch({ value, onChange, onSelect }: PlaceSearchProps) {
  const [page, setPage] = React.useState(1);
  const { houseMemo, setHouseMemo } = useHouseMemo();

  const { data, isLoading, isError } = usePlacesQuery(value, page);

  const results = data?.documents ?? [];
  const isEnd = data?.meta.is_end ?? true;

  return (
    <div className="flex flex-col gap-3">
      <div className="relative w-full justify-center py-2">
        <Input
          placeholder="지도에 표시할 장소를 검색해보세요."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') setPage(1);
          }}
          rightChildren={
            <Icon
              name="search"
              className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
              width={20}
              height={25}
              onClick={() => setPage(1)}
            />
          }
        />
      </div>

      {isLoading && <div></div>}
      {isError && <div>검색 오류가 발생했습니다.</div>}

      <ul className="flex max-h-[400px] flex-col gap-2 overflow-y-auto">
        {results.map((place) => (
          <li
            key={place.id}
            className="hover:bg-coolGray-20 cursor-pointer rounded-lg p-3"
            onClick={() => {
              onSelect(place);

              setHouseMemo((prev) => ({
                ...prev,
                address: place.address_name,
                longitude: place.x,
                latitude: place.y,
              }));
            }}
          >
            <div className="font-semibold">{place.place_name}</div>
            {place.road_address_name ? (
              <div className="text-sm text-gray-600">
                {place.road_address_name}
                <br />
                <span className="text-gray-400">{place.address_name}</span>
              </div>
            ) : (
              <div className="text-sm text-gray-600">{place.address_name}</div>
            )}
            {place.phone && <div className="text-sm text-gray-500">{place.phone}</div>}
          </li>
        ))}
      </ul>

      {results.length > 0 && (
        <div className="flex justify-center gap-2 py-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-2 disabled:text-gray-400"
          >
            이전
          </button>
          <span>{page}</span>
          <button
            disabled={isEnd}
            onClick={() => setPage((p) => p + 1)}
            className="px-2 disabled:text-gray-400"
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}
