'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Icon } from '@/components/ui/Icon';
import ky from 'ky';

interface Place {
  id: string;
  place_name: string;
  address_name: string;
  road_address_name: string;
  phone: string;
  x: string;
  y: string;
}

interface Meta {
  is_end: boolean;
  pageable_count: number;
  total_count: number;
}

interface ApiResponse {
  documents: Place[];
  meta: Meta & { same_name: any };
}

interface PlaceSearchProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (place: Place) => void;
}

export default function PlaceSearch({ value, onChange, onSelect }: PlaceSearchProps) {
  const [results, setResults] = useState<Place[]>([]);
  const [page, setPage] = useState(1);
  const [isEnd, setIsEnd] = useState(false);

  const searchPlaces = async (pageNum = 1) => {
    if (!value.trim()) return;

    try {
      const res: ApiResponse = await ky
        .get('https://dapi.kakao.com/v2/local/search/keyword.json', {
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
          },
          searchParams: {
            query: value,
            page: pageNum.toString(),
            size: '10',
          },
        })
        .json();

      setResults(res.documents);
      setPage(pageNum);
      setIsEnd(res.meta.is_end);
    } catch (err) {
      console.error('검색 오류:', err);
      alert('검색 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="relative w-full justify-center py-2">
        <Input
          placeholder="장소를 검색해보세요."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') searchPlaces(1);
          }}
          rightChildren={
            <Icon
              name="search"
              className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
              width={20}
              height={25}
              onClick={() => searchPlaces(1)}
            />
          }
        />
      </div>

      <ul className="flex max-h-[400px] flex-col gap-2 overflow-y-auto">
        {results.map((place) => (
          <li
            key={place.id}
            className="cursor-pointer rounded-lg border p-3 hover:bg-gray-100"
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
      </ul>

      {results.length > 0 && (
        <div className="flex justify-center gap-2 py-2">
          <button
            disabled={page === 1}
            onClick={() => searchPlaces(page - 1)}
            className="px-2 disabled:text-gray-400"
          >
            이전
          </button>
          <span>{page}</span>
          <button
            disabled={isEnd}
            onClick={() => searchPlaces(page + 1)}
            className="px-2 disabled:text-gray-400"
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}
