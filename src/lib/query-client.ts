import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 기본 설정
      staleTime: 5 * 60 * 1000, // 캐시된 데이터를 5분간 fresh 상태로 유지
      gcTime: 10 * 60 * 1000, // 메모리에서 10분 후 가비지컬렉션
      retry: 1, // 실패 시 1회 재시도
      refetchOnWindowFocus: false, // 탭 포커스 전환 시 refetch 방지
    },
    mutations: {
      retry: 1,
    },
  },
});
