import { api } from '@/lib/api/ky';

type RequiredItemRequest = {
  itemIdList: number[];
};

export async function sendRequiredItems(payload: RequiredItemRequest) {
  const res = await api.put('api/required-item', { json: payload }).json();
  return res;
}
