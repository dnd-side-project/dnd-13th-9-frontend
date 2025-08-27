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
  });
}
