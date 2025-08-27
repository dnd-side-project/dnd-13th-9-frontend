import { api } from '@/lib/api/ky';
import { HTTPError } from 'ky';
import { MyInfoResponse, LogoutResponse } from '@/types/auth';

export async function myInfo(): Promise<MyInfoResponse | null> {
  try {
    return await api.get('api/auth/my').json<MyInfoResponse>();
  } catch (err) {
    if (err instanceof HTTPError && err.response?.status === 401) {
      return null;
    }
    return null;
  }
}

export async function logout(): Promise<LogoutResponse> {
  return api.post('api/auth/logout').json<LogoutResponse>();
}
