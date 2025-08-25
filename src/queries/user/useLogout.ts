import { useMutation } from '@tanstack/react-query';
import { logout } from '@/services/auth';
import { LogoutResponse } from '@/types/auth';
import { useRouter } from 'next/navigation';

export function useLogout() {
  const router = useRouter();

  return useMutation<LogoutResponse, Error, void>({
    mutationFn: logout,
    onSuccess: () => router.push('/login'),
    onError: (err) => console.error('로그아웃 실패', err),
  });
}
