import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePlan, type Plan } from '@/services/plan';
import { planKeys } from './usePlansQuery';

export function useDeletePlanMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ planId }: { planId: number }) => deletePlan(planId),
    onSuccess: (_ok, { planId }) => {
      qc.setQueryData<Plan[]>(planKeys.all, (prev) =>
        (prev ?? []).filter((p) => p.planId !== planId)
      );
    },
    onError: async (err: any) => {
      try {
        const status = err?.response?.status as number | undefined;
        const body = await err?.response?.clone()?.json();
        const code = body?.code?.toString?.();
        if (status === 403 || code === '71004') {
          alert('기본 계획은 삭제할수 없어요!');
          return;
        }
        if (status === 404) {
          alert('유요하지않은 계획이에요');
          return;
        }
      } catch {}
      alert('삭제 중 문제가 발생했어요. 다시 시도해주세요');
    },
  });
}
