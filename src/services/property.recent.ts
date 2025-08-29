import { api } from '@/lib/api/ky';

export type RecentProperty = {
  propertyId: number;
  imageUrl: string | null;
  feeling: 'GOOD' | 'SOSO' | 'BAD' | null;
  title: string;
  depositBig: number; // 억
  depositSmall: number; // 만원
  managementFee: number | null; // 만원
  contractType: 'MONTHLY_RENT' | 'JEONSE' | 'PURCHASE';
  planName: string;
  folderName: string;
};

type MaybeWrapped<T> = T | { code?: string | number; message?: string; data: T };

function unwrap<T>(res: MaybeWrapped<T>): T {
  if (res && typeof res === 'object' && 'data' in (res as any)) {
    return (res as any).data as T;
  }
  return res as T;
}

export async function fetchRecentProperties(): Promise<RecentProperty[]> {
  const res = await api.get('api/property/recent').json<MaybeWrapped<RecentProperty[]>>();
  return unwrap(res);
}
