import { useQuery } from '@tanstack/react-query';
import { myInfo } from '@/services/auth';
import { MyInfoResponse } from '@/types/auth';

export function useMyInfo() {
  return useQuery<MyInfoResponse | null>({
    queryKey: ['myInfo'],
    queryFn: myInfo,
    retry: false,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: false,
  });
}
