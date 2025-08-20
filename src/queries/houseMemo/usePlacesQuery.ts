import { useQuery } from '@tanstack/react-query';
import { fetchPlaces, ApiResponse } from '@/services/house.memo';

export function usePlacesQuery(value: string, page: number) {
  return useQuery<ApiResponse>({
    queryKey: ['places', value, page],
    queryFn: () => fetchPlaces(value, page),
  });
}
