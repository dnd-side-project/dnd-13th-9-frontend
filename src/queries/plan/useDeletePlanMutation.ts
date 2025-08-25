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
  });
}
