import ky from 'ky';
import { getCookie } from 'cookies-next';

const getToken = () => {
  if (typeof window !== 'undefined') {
    return getCookie('Access') as string | undefined;
  }
  return '';
};

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});
