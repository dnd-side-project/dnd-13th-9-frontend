import { useQuery } from '@tanstack/react-query';
import { fetchRecentProperties, type RecentProperty } from '@/services/property.recent';

export const recentPropertyKeys = {
  all: ['recentProperties'] as const,
};

export function useRecentProperties(enabled: boolean = true) {
  return useQuery<RecentProperty[]>({
    queryKey: recentPropertyKeys.all,
    queryFn: fetchRecentProperties,
    staleTime: 60 * 1000,
    enabled,
  });
}
