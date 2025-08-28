import { useMutation } from '@tanstack/react-query';
import { sendRequiredItems } from '@/services/checkList';
import toast from 'react-hot-toast';

export function useSendRequiredItems() {
  return useMutation({
    mutationFn: sendRequiredItems,
    onSuccess: (data) => {
      toast.success('필수 항목이 저장되었습니다.');
    },
    onError: (error) => {},
  });
}
