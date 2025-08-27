import { useQuery } from '@tanstack/react-query';
import { getChecklist } from '@/services/house.memo';
import { ChecklistResponse } from '@/types/checklist';

export function useChecklistInfo() {
  return useQuery<ChecklistResponse>({
    queryKey: ['checklist'],
    queryFn: getChecklist,
  });
}
