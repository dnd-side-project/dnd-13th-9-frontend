import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateFolderName, type Folder } from '@/services/folder';
import { folderKeys } from './useFoldersQuery';

export function useUpdateFolderNameMutation(planId: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ folderId, name }: { folderId: number; name: string }) =>
      updateFolderName(folderId, { planId, name }),
    onMutate: async ({ folderId, name }) => {
      await qc.cancelQueries({ queryKey: folderKeys.byPlan(planId) });
      const previous = qc.getQueryData<Folder[]>(folderKeys.byPlan(planId));
      qc.setQueryData<Folder[]>(folderKeys.byPlan(planId), (prev) =>
        (prev ?? []).map((f) => (f.folderId === folderId ? { ...f, name } : f))
      );
      return { previous } as { previous?: Folder[] };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) qc.setQueryData(folderKeys.byPlan(planId), ctx.previous);
    },
    onSuccess: (updated) => {
      qc.setQueryData<Folder[]>(folderKeys.byPlan(planId), (prev) =>
        (prev ?? []).map((f) => (f.folderId === updated.folderId ? { ...f, ...updated } : f))
      );
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: folderKeys.byPlan(planId) });
    },
  });
}
