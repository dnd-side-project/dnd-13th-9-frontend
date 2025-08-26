import { ApiResponse, HouseMemoData } from '@/types/house-memo-byId';
import { api } from '@/lib/api/ky';

export async function getHouseMemoById(id: string): Promise<ApiResponse<HouseMemoData>> {
  const res = await api.get(`api/property/${id}`).json<ApiResponse<HouseMemoData>>();
  return res;
}
