import { useQuery } from '@tanstack/react-query';
import { fetchFolders, type Folder } from '@/services/folder';

export const folderKeys = {
  all: ['folders'] as const,
  byPlan: (planId: number) => [...folderKeys.all, planId] as const,
};

export function useFoldersQuery(planId: number, enabled: boolean = true) {
  return useQuery<Folder[]>({
    queryKey: folderKeys.byPlan(planId),
    queryFn: () => fetchFolders(planId),
    enabled: enabled && Number.isFinite(planId),
    staleTime: 60 * 1000,
  });
}
