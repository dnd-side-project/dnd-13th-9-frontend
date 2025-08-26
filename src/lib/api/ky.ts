import ky from 'ky';

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          try {
            const refreshRes = await ky.post('/api/auth/refresh', { credentials: 'include' });
            if (refreshRes.ok) {
              return ky(request);
            }
          } catch {
            console.warn('토큰 갱신 실패');
          }
        }
        return response;
      },
    ],
  },
});

export const apiFormData = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: 'include',
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          try {
            const refreshRes = await ky.post('/api/auth/refresh', { credentials: 'include' });
            if (refreshRes.ok) {
              return ky(request);
            }
          } catch {
            console.warn('토큰 갱신 실패');
          }
        }
        return response;
      },
    ],
  },
});
