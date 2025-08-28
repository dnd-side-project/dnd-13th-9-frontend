import ky, { AfterResponseHook } from 'ky';

// 스킵할 경로 prefix 목록 불러오기 (env → fallback)
const getRefreshSkipPrefixes = (): string[] => {
  const raw = process.env.NEXT_PUBLIC_AUTH_REFRESH_SKIP_PATHS ?? '';
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean).length
    ? raw
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    : ['/', '/login', '/vote', '/video', '/etiquette'];
};

// 현재 브라우저 경로가 skip 대상인지
const shouldSkipRefresh = (): boolean => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname;
  return getRefreshSkipPrefixes().some((p) => (p === '/' ? path === '/' : path.startsWith(p)));
};

// 로그인 페이지에서 이미 인증된 상태면 메인으로 리다이렉트
const redirectWhenAuthedOnLogin: AfterResponseHook = async (request, _, response) => {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname;
    if (path.startsWith('/login')) {
      // 내 정보 조회가 성공하면 인증된 상태로 판단
      if (response.ok && request.url.endsWith('/api/auth/my')) {
        window.location.replace('/');
      }
    }
  }
  return response;
};

// 공통 afterResponse 훅 (401 처리)
const handle401: AfterResponseHook = async (request, _, response) => {
  if (response.status !== 401) return response;
  if (request.url.endsWith('/api/auth/refresh')) return response; // 무한 루프 방지
  if (shouldSkipRefresh()) return response;

  try {
    const refreshRes = await ky.post('/api/auth/refresh', { credentials: 'include' });
    if (refreshRes.ok) {
      // 원래 요청 다시 실행 (옵션 보존)
      return ky(request.url, request);
    }
  } catch {
    console.warn('토큰 갱신 실패');
  }

  if (typeof window !== 'undefined') {
    // 로그아웃 후 잠시 동안은 로그인 리다이렉트 억제
    try {
      const until = Number(sessionStorage.getItem('suppressAuthRedirectUntil') ?? '0');
      if (Number.isFinite(until) && Date.now() < until) {
        return response;
      }
    } catch {}
    const path = window.location.pathname;
    if (path !== '/' && !path.startsWith('/login')) {
      const redirect = encodeURIComponent(window.location.href);
      window.location.replace(`/login?redirect=${redirect}`);
    }
  }
  return response;
};

// 공통 옵션
const baseConfig = {
  prefixUrl: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: 'include' as const,
  hooks: { afterResponse: [redirectWhenAuthedOnLogin, handle401] },
};

// JSON 요청용
export const api = ky.create({
  ...baseConfig,
  headers: { 'Content-Type': 'application/json' },
});

// FormData 요청용
export const apiFormData = ky.create(baseConfig);
