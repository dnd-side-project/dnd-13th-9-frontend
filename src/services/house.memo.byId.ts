import { ApiResponse, HouseMemoDataById } from '@/types/house-memo';
import { api } from '@/lib/api/ky';

export async function getHouseMemoById(id: string): Promise<ApiResponse<HouseMemoDataById>> {
  const res = await api.get(`api/property/${id}`).json<ApiResponse<HouseMemoDataById>>();
  return res;
}

export async function deleteHouseMemoById(id: string): Promise<ApiResponse<void>> {
  const res = await api.delete(`api/property/${id}`).json<ApiResponse<void>>();
  return res;
}
