import { useQuery } from '@tanstack/react-query';
import { getChecklistInfo } from '@/services/checkList';
import { ChecklistResponse } from '@/types/checklist';

export const useChecklistInfo = () => {
  return useQuery<ChecklistResponse>({
    queryKey: ['checklist'],
    queryFn: getChecklistInfo,
  });
};
