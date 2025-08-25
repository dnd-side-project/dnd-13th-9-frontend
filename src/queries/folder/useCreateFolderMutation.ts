import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFolder, type Folder } from '@/services/folder';
import { folderKeys } from './useFoldersQuery';

export function useCreateFolderMutation(planId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { name: string }) => createFolder({ planId, name: vars.name }),
    onSuccess: (created) => {
      qc.setQueryData<Folder[]>(folderKeys.byPlan(planId), (prev) => {
        const base = prev ?? [];
        // 새 폴더는 매물이 없으므로 recordCount를 0으로 보정하여 표시
        const normalized: Folder = { ...created, recordCount: created.recordCount ?? 0 } as Folder;
        return [normalized, ...base];
      });
    },
  });
}
