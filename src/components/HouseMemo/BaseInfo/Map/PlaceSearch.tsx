'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Icon } from '@/components/ui/Icon';
import { usePlacesQuery } from '@/queries/houseMemo/usePlacesQuery';
import { Place } from '@/services/house.memo';
import Loading from '@/app/loading';

type PlaceSearchProps = {
  value: string;
  onChange: (value: string) => void;
  onSelect: (place: Place) => void;
};

export default function PlaceSearch({ value, onChange, onSelect }: PlaceSearchProps) {
  const [page, setPage] = useState(1);
  const [places, setPlaces] = useState<Place[]>([]);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, isError } = usePlacesQuery(searchTriggered ? value : '', page);

  useEffect(() => {
    setSearchTriggered(false);
    setPage(1);
    setPlaces([]);
  }, [value]);

  useEffect(() => {
    if (!searchTriggered) return;
    if (page === 1) {
      setPlaces(data?.documents ?? []);
    } else if (data?.documents) {
      setPlaces((prev) => [...prev, ...data.documents]);
    }
  }, [data, page, searchTriggered]);

  useEffect(() => {
    if (!loaderRef.current || !searchTriggered) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && data?.meta.is_end === false) {
          setPage((p) => p + 1);
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [data, searchTriggered]);

  const handleSearch = () => {
    if (value.trim() === '') return;
    setPage(1);
    setSearchTriggered(true);
  };

  return (
    <div className="flex max-h-[450px] flex-col gap-3">
      <div className="relative w-full py-2">
        <Input
          placeholder="지도에 표시할 장소를 검색해보세요."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
          className="w-full rounded-xl border p-2"
          rightChildren={
            <Icon
              name="search"
              className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
              width={20}
              height={25}
              onClick={handleSearch}
            />
          }
        />
      </div>

      {isError && searchTriggered && <Loading />}

      {searchTriggered && (
        <ul className="flex max-h-[400px] flex-col gap-2 overflow-y-auto">
          {places.map((place) => (
            <li
              key={place.id}
              className="hover:bg-coolGray-20 cursor-pointer rounded-lg p-3"
              onClick={() => onSelect(place)}
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
          <div ref={loaderRef} />
        </ul>
      )}

      {isLoading && searchTriggered && <div className="py-2 text-center"></div>}
    </div>
  );
}
