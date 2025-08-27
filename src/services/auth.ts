import { api } from '@/lib/api/ky';
import { MyInfoResponse, LogoutResponse } from '@/types/auth';

export async function myInfo(): Promise<MyInfoResponse> {
  return api.get('api/auth/my').json<MyInfoResponse>();
}

export async function logout(): Promise<LogoutResponse> {
  return api.post('api/auth/logout').json<LogoutResponse>();
}
