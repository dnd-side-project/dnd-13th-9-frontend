import { api } from '@/lib/api/ky';

export type Folder = {
  folderId: number;
  name: string;
  createdAt: string; // ISO string
  recordCount?: number;
  isDefaultFolder?: boolean;
};

type MaybeWrapped<T> = T | { code?: string | number; message?: string; data: T | null };

function unwrap<T>(res: MaybeWrapped<T>): T {
  if (res && typeof res === 'object' && 'data' in (res as any)) {
    return ((res as any).data ?? null) as T;
  }
  return res as T;
}

export async function fetchFolders(planId: number): Promise<Folder[]> {
  const res = await api.get(`api/folder/${planId}`).json<MaybeWrapped<Folder[]>>();
  return unwrap(res) ?? [];
}

export async function createFolder(payload: { planId: number; name: string }): Promise<Folder> {
  const res = await api.post('api/folder', { json: payload }).json<MaybeWrapped<Folder>>();
  return unwrap(res);
}

export async function updateFolderName(
  folderId: number,
  payload: { planId: number; name: string }
): Promise<Folder> {
  const res = await api
    .patch(`api/folder/${folderId}`, { json: payload })
    .json<MaybeWrapped<Folder>>();
  return unwrap(res);
}

export async function deleteFolder(folderId: number): Promise<void> {
  // ky throws on 4xx/5xx, 성공 시에만 resolve
  const res = await api
    .delete(`api/folder/${folderId}`)
    .json<MaybeWrapped<Record<string, unknown>>>();
  void res;
}
