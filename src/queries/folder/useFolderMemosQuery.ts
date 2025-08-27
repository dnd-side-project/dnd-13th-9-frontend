import { useQuery } from '@tanstack/react-query';
import { fetchFolderMemos } from '@/services/folder.memos';
import { normalizeMemos, type ViewModel } from '@/types/memo-view-model';

export const folderMemoKeys = {
  all: ['folderMemos'] as const,
  byFolder: (folderId: number) => [...folderMemoKeys.all, folderId] as const,
};

export function useFolderMemosQuery(folderId: number | null | undefined, enabled: boolean = true) {
  return useQuery<ViewModel[]>({
    queryKey: folderMemoKeys.byFolder(Number(folderId)),
    queryFn: async () => {
      const payload = await fetchFolderMemos(Number(folderId));
      return normalizeMemos(payload);
    },
    enabled: enabled && Number.isFinite(Number(folderId)) && Number(folderId) > 0,
    staleTime: 30 * 1000,
  });
}
