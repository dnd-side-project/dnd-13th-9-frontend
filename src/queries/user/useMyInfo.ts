import { useQuery } from '@tanstack/react-query';
import { myInfo } from '@/services/auth';
import { MyInfoResponse } from '@/types/auth';

export function useMyInfo() {
  return useQuery<MyInfoResponse>({
    queryKey: ['myInfo'],
    queryFn: myInfo,
  });
}
