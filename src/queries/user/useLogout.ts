import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '@/services/auth';
import { LogoutResponse } from '@/types/auth';
import { useRouter } from 'next/navigation';

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation<LogoutResponse, Error, void>({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myInfo'] });
      router.push('/login');
    },
    onError: (err) => console.error('로그아웃 실패', err),
  });
}
