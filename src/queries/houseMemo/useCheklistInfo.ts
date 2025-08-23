import { useQuery } from '@tanstack/react-query';
import { getChecklist } from '@/services/house.memo';

export function useChecklist() {
  return useQuery({
    queryKey: ['checklist'],
    queryFn: getChecklist,
  });
}
