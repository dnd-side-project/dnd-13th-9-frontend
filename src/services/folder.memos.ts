import { api } from '@/lib/api/ky';
import type { RecordSummaryDto, PlaceMemoDto } from '@/types/memo-view-model';

type ApiEnvelope<T> = { code: string | number; message?: string; data: T };

export async function fetchFolderMemos(folderId: number): Promise<{
  recordSummaryResponses: RecordSummaryDto[];
  queryPlaceMemoResponses: PlaceMemoDto[];
}> {
  const res = await api.get(`api/folder/${folderId}/memos`).json<
    ApiEnvelope<{
      recordSummaryResponses: RecordSummaryDto[];
      queryPlaceMemoResponses: PlaceMemoDto[];
    }>
  >();
  return res?.data ?? { recordSummaryResponses: [], queryPlaceMemoResponses: [] };
}
