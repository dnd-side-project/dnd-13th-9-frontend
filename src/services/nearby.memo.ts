import { apiFormData } from '@/lib/api/ky';
import { NearbyMemo } from '@/types/nearby-memo';

export async function createNearbyMemo(formData: FormData): Promise<NearbyMemo> {
  const res = apiFormData.post('api/placeMemo', {
    body: formData,
  });

  return res.json<NearbyMemo>();
}
