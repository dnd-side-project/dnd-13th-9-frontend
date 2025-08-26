import { useQuery } from '@tanstack/react-query';
import { fetchPlans, type Plan } from '@/services/plan';

export const planKeys = {
  all: ['plans'] as const,
};

export function usePlansQuery() {
  return useQuery<Plan[]>({
    queryKey: planKeys.all,
    queryFn: fetchPlans,
    staleTime: 60 * 1000,
  });
}
