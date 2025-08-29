import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteHouseMemoById } from '@/services/house.memo.byId';
import toast from 'react-hot-toast';
import { TOAST_STYLES } from '@/utils/toastStyles';

export function useDeleteHouseMemo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteHouseMemoById(id),
    onSuccess: () => {
      toast.success('매물 메모가 삭제되었습니다.', TOAST_STYLES.success);

      queryClient.invalidateQueries({ queryKey: ['houseMemos'] });
      queryClient.invalidateQueries({ queryKey: ['folderMemos'] });
      queryClient.invalidateQueries({ queryKey: ['folders'] });
    },
    onError: (error) => {
      console.error('집 메모 삭제 실패:', error);
      toast.error('집 메모 삭제에 실패했습니다.', TOAST_STYLES.error);
    },
  });
}
