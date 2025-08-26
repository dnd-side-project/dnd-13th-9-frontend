import { useQuery } from '@tanstack/react-query';
import { fetchPlaces, ApiResponse } from '@/services/house.memo';

export function usePlacesQuery(query: string, page: number) {
  return useQuery<ApiResponse>({
    queryKey: ['places', query, page],
    queryFn: () => fetchPlaces(query, page),
    enabled: !!query.trim(),
  });
}
