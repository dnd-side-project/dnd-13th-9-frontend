import { api } from '@/lib/api/ky';
import { ChecklistResponse } from '@/types/checklist';

type RequiredItemRequest = {
  itemIdList: number[];
};

export async function sendRequiredItems(payload: RequiredItemRequest) {
  const res = await api.put('api/required-item', { json: payload }).json();
  return res;
}

export async function getChecklistInfo(): Promise<ChecklistResponse> {
  const res = await api.get('api/checklist').json();
  return res as ChecklistResponse;
}
