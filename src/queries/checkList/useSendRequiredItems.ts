import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendRequiredItems } from '@/services/checkList';
import toast from 'react-hot-toast';
import { TOAST_STYLES } from '@/utils/toastStyles';

export function useSendRequiredItems() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendRequiredItems,
    onSuccess: () => {
      toast.success('필수 항목이 저장되었습니다.', TOAST_STYLES.success);
      queryClient.invalidateQueries({
        queryKey: ['checklist'],
      });
    },
    onError: (error) => {
      toast.error('저장 중 오류가 발생했습니다.', TOAST_STYLES.error);
      console.error(error);
    },
  });
}
