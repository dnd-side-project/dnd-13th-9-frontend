import { useQuery } from '@tanstack/react-query';
import { getHouseMemoById } from '@/services/house.memo.byId';
import { ApiResponse } from '@/types/house-memo-byId';

export function useHouseMemoInfoById(id: string) {
  return useQuery<ApiResponse>({
    queryKey: ['house-memo', id],
    queryFn: () => getHouseMemoById(id),
  });
}
