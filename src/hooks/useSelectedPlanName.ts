import { useMapStore } from '@/stores/useMapStore';
import { usePlansQuery } from '@/queries/plan/usePlansQuery';

export function useSelectedPlanName(): string {
  const planId = useMapStore((s) => s.planId);
  const { data } = usePlansQuery();
  const storeName = useMapStore((s) => s.plans.find((p) => p.planId === planId)?.name);
  const apiName = data?.find((p) => p.planId === planId)?.name;
  return apiName ?? storeName ?? '폴더';
}
