import { api } from '@/lib/api/ky';

export type Plan = {
  planId: number;
  name: string;
  createdAt: string; // ISO string from API
  folderCount?: number;
  isDefaultPlan: boolean;
};

type MaybeWrapped<T> = T | { code?: string | number; message?: string; data: T };

function unwrap<T>(res: MaybeWrapped<T>): T {
  if (res && typeof res === 'object' && 'data' in (res as any)) {
    return (res as any).data as T;
  }
  return res as T;
}

export async function fetchPlans(): Promise<Plan[]> {
  const res = await api.get('api/plan').json<MaybeWrapped<Plan[]>>();
  return unwrap(res);
}

export async function createPlan(payload: { name: string }): Promise<Plan> {
  const res = await api.post('api/plan', { json: payload }).json<MaybeWrapped<Plan>>();
  return unwrap(res);
}

export async function updatePlanName(planId: number, payload: { name: string }): Promise<Plan> {
  const res = await api.patch(`api/plan/${planId}`, { json: payload }).json<MaybeWrapped<Plan>>();
  return unwrap(res);
}

export async function deletePlan(planId: number): Promise<void> {
  // ky는 4xx/5xx에서 예외를 throw 하므로, 성공 시에만 여기까지 도달
  const res = await api.delete(`api/plan/${planId}`).json<MaybeWrapped<Record<string, unknown>>>();
  void res;
}
