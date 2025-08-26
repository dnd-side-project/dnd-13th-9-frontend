import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePlanName, type Plan } from '@/services/plan';
import { planKeys } from './usePlansQuery';

export function useUpdatePlanNameMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ planId, name }: { planId: number; name: string }) =>
      updatePlanName(planId, { name }),
    // 낙관적 업데이트: 취소 → 스냅샷 → 낙관적 설정
    onMutate: async ({ planId, name }) => {
      await qc.cancelQueries({ queryKey: planKeys.all });
      const previous = qc.getQueryData<Plan[]>(planKeys.all);
      qc.setQueryData<Plan[]>(planKeys.all, (prev) =>
        (prev ?? []).map((p) => (p.planId === planId ? { ...p, name } : p))
      );
      return { previous } as { previous?: Plan[] };
    },
    // 실패 시 롤백
    onError: (_err, _vars, context) => {
      if (context?.previous) qc.setQueryData(planKeys.all, context.previous);
    },
    // 성공 시 서버 결과 동기화
    onSuccess: (updated) => {
      qc.setQueryData<Plan[]>(planKeys.all, (prev) =>
        (prev ?? []).map((p) => (p.planId === updated.planId ? { ...p, ...updated } : p))
      );
    },
    // 최신 상태 확인
    onSettled: () => {
      qc.invalidateQueries({ queryKey: planKeys.all });
    },
  });
}
