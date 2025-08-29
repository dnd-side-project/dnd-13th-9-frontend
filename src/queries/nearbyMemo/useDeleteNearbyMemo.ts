import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNearbyMemoById } from '@/services/nearby.memo';
import toast from 'react-hot-toast';
import { TOAST_STYLES } from '@/utils/toastStyles';

export function useDeleteNearbyMemo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteNearbyMemoById(id),
    onSuccess: () => {
      toast.success('주변 메모가 삭제되었습니다.', TOAST_STYLES.success);

      queryClient.invalidateQueries({ queryKey: ['nearbyMemos'] });
      queryClient.invalidateQueries({ queryKey: ['folderMemos'] });
      queryClient.invalidateQueries({ queryKey: ['folders'] });
    },
    onError: (error) => {
      console.error('주변 메모 삭제 실패:', error);
      toast.error('주변 메모 삭제에 실패했습니다.', TOAST_STYLES.error);
    },
  });
}
