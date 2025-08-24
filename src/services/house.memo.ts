import ky from 'ky';
import { api } from '@/lib/api/ky';
import { ChecklistResponse } from '@/types/checklist';

export type Place = {
  id: string;
  place_name: string;
  address_name: string;
  road_address_name: string;
  phone: string;
  x: string;
  y: string;
};

export type Meta = {
  is_end: boolean;
  pageable_count: number;
  total_count: number;
};

export type ApiResponse = {
  documents: Place[];
  meta: Meta & { same_name: any };
};

export async function fetchPlaces(query: string, page: number): Promise<ApiResponse> {
  if (!query.trim()) {
    return {
      documents: [],
      meta: { is_end: true, pageable_count: 0, total_count: 0, same_name: {} },
    };
  }

  return ky
    .get('https://dapi.kakao.com/v2/local/search/keyword.json', {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
      },
      searchParams: {
        query,
        page: page.toString(),
        size: '10',
      },
    })
    .json<ApiResponse>();
}

export async function getChecklist(): Promise<ChecklistResponse> {
  return api.get('api/checklist').json();
}
