import { useQuery } from '@tanstack/react-query';
import { getNearbyMemoById } from '@/services/nearby.memo';

export function useNearbyMemoInfoById(id: string) {
  return useQuery({
    queryKey: ['house-memo', id],
    queryFn: () => getNearbyMemoById(id),
  });
}
