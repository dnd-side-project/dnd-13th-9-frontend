import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getChecklistInfo } from '@/services/checkList';
import type { ChecklistResponse } from '@/types/checklist';

export const checklist = createQueryKeys('checklist', {
  all: null,
  info: {
    queryKey: null,
    queryFn: (): Promise<ChecklistResponse> => getChecklistInfo(),
  },
});
