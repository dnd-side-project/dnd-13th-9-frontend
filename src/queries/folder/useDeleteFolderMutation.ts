import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFolder } from '@/services/folder';
import { folderKeys } from './useFoldersQuery';

export function useDeleteFolderMutation(planId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { folderId: number }) => deleteFolder(vars.folderId),
    onSuccess: (_res, { folderId }) => {
      qc.setQueryData(folderKeys.byPlan(planId), (prev: any) =>
        (prev ?? []).filter((f: any) => f.folderId !== folderId)
      );
    },
  });
}
