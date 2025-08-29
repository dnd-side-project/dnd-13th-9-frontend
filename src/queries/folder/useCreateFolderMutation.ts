import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFolder, type Folder } from '@/services/folder';
import { folderKeys } from './useFoldersQuery';
import toast from 'react-hot-toast';

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
    onError: async (err: any) => {
      try {
        const status = err?.response?.status as number | undefined;
        const body = await err?.response?.clone()?.json();
        const code = body?.code?.toString?.();
        if (status === 400 && code === '72001') {
          alert('최대 생성할 수 있는 폴더 갯수를 초과했어요!');
          return;
        }
        if (status === 422) {
          alert('최대 10자까지 쓸수있어요');
          return;
        }
      } catch {}
      alert('생성중 문제가 발생했다 다시 시도해주세요');
    },
  });
}
