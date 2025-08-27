import { apiFormData } from '@/lib/api/ky';
import { NearbyMemo } from '@/types/nearby-memo';
import { api } from '@/lib/api/ky';
import { NearbyMemoById, ApiResponse } from '@/types/nearby-memo';

export async function createNearbyMemo(formData: FormData): Promise<NearbyMemo> {
  const res = await apiFormData.post('api/placeMemo', {
    body: formData,
  });

  return await res.json<NearbyMemo>();
}

export async function getNearbyMemoById(id: string): Promise<ApiResponse<NearbyMemoById>> {
  const res = await api.get(`api/placeMemo/${id}`).json<ApiResponse<any>>();

  const data = res.data;

  const converted: NearbyMemoById = {
    ...data,
    latitude: Number(data.latitude),
    longitude: Number(data.longitude),
  };

  return {
    ...res,
    data: converted,
  };
}
