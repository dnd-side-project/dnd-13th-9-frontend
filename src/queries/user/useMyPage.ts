import { useQuery } from '@tanstack/react-query';
import { mypage } from '@/services/auth';
import { MyPageResponse } from '@/types/auth';
import { HTTPError } from 'ky';

export function useMyPage() {
  return useQuery<MyPageResponse | null>({
    queryKey: ['mypage'],
    queryFn: async () => {
      try {
        return await mypage();
      } catch (err) {
        if (err instanceof HTTPError && err.response?.status === 401) {
          return null;
        }
        throw err;
      }
    },
    retry: 1,
  });
}
