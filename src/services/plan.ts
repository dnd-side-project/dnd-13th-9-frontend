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

export async function deletePlan(planId: number): Promise<boolean> {
  // 일부 백엔드는 wrapper {code,message,data:{}} 형태를 반환
  try {
    const res = await api
      .delete(`api/plan/${planId}`)
      .json<MaybeWrapped<Record<string, unknown>>>();
    // 성공 시 true로 취급
    void res;
    return true;
  } catch (e) {
    return false;
  }
}
