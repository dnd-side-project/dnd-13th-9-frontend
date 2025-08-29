import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPlan, type Plan } from '@/services/plan';
import { planKeys } from './usePlansQuery';

export function useCreatePlanMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { name: string }) => createPlan(vars),
    onSuccess: (created) => {
      qc.setQueryData<Plan[]>(planKeys.all, (prev) => {
        const base = prev ?? [];
        return [created, ...base];
      });
    },
    onError: async (err: any) => {
      try {
        const status = err?.response?.status as number | undefined;
        const body = await err?.response?.clone()?.json();
        const code = body?.code?.toString?.();
        if (status === 400 && (code === '40000' || code === '42200')) {
          alert('계획은 최대 10개까지 생성할수있어요!');
          return;
        }
        if (status === 422) {
          alert('최대 10자까지 쓸수있어요');
          return;
        }
      } catch {}
      alert('생성중 문제가 발생했다 다시 시도해주세요');
    },
  });
}
