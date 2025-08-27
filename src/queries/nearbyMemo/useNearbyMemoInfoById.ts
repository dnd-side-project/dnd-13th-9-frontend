import { useQuery } from '@tanstack/react-query';
import { getNearbyMemoById } from '@/services/nearby.memo';

export function useNearbyMemoInfoById(id: string) {
  return useQuery({
    queryKey: ['nearby-memo', id],
    queryFn: () => getNearbyMemoById(id),
  });
}
