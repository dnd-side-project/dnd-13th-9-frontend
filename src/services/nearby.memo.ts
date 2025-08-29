import { apiFormData } from '@/lib/api/ky';
import { NearbyMemo, CreateNearbyMemoResponse } from '@/types/nearby-memo';
import { api } from '@/lib/api/ky';
import { NearbyMemoById, ApiResponse } from '@/types/nearby-memo';

export async function createNearbyMemo(formData: FormData): Promise<CreateNearbyMemoResponse> {
  const res = await apiFormData.post('api/placeMemo', {
    body: formData,
  });

  return await res.json<CreateNearbyMemoResponse>();
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

export async function deleteNearbyMemoById(id: string): Promise<ApiResponse<void>> {
  const res = await api.delete(`api/placeMemo/${id}`).json<ApiResponse<void>>();
  return res;
}
