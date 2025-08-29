import { NextRequest, NextResponse } from 'next/server';

const API_ORIGIN_ENV = process.env.NEXT_PUBLIC_BASE_URL;

function apiUrl(req: NextRequest, path: string) {
  const origin = API_ORIGIN_ENV ?? new URL(req.url).origin;
  return `${origin}${path}`;
}

async function verifyAuth(req: NextRequest): Promise<boolean> {
  const cookieHeader = req.headers.get('cookie');
  if (!cookieHeader) return false;

  const controller = new AbortController();
  const to = setTimeout(() => controller.abort(), 2500);

  try {
    const res = await fetch(apiUrl(req, '/api/auth/my'), {
      headers: { cookie: cookieHeader, Accept: 'application/json' },
      cache: 'no-store',
      signal: controller.signal,
    });
    return res.ok; // 2xx만 통과
  } catch {
    return false;
  } finally {
    clearTimeout(to);
  }
}

export async function middleware(request: NextRequest) {
  const authed = await verifyAuth(request);

  if (!authed) {
    const loginUrl = new URL('/login', request.url);
    const redirectPath = request.nextUrl.pathname + request.nextUrl.search;
    loginUrl.searchParams.set('redirect', redirectPath);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// 보호할 페이지만 매칭 (정적/이미지 등 제외)
export const config = {
  matcher: ['/myPage', '/map/:path*', '/checklist'],
};
