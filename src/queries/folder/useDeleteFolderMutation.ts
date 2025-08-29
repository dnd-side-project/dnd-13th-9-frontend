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
    onError: async (err: any) => {
      try {
        const status = err?.response?.status as number | undefined;
        const body = await err?.response?.clone()?.json();
        const code = body?.code?.toString?.();
        if (status === 403 || code === '71004') {
          alert('기본 폴더는 삭제할수 없어요!');
          return;
        }
        if (status === 404) {
          alert('유요하지않은 계획이에요');
          return;
        }
      } catch {}
      alert('삭제 중 문제가 발생했어요. 다시 시도해주세요');
    },
  });
}
