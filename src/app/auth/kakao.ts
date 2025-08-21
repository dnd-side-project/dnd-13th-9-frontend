import type { NextApiRequest, NextApiResponse } from 'next';
import ky from 'ky';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.body;

  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!;
  const TOKEN_URL = 'https://kauth.kakao.com/oauth/token';

  try {
    const tokenRes = await ky.post(TOKEN_URL, {
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code,
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token } = tokenRes.data;

    // 사용자 정보 요청
    const userRes = await ky.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const userInfo = userRes.data;

    res.status(200).json({ user: userInfo, token: access_token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '카카오 로그인 실패' });
  }
}
