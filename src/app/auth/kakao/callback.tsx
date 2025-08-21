import { useEffect } from 'react';
import { useRouter } from 'next/router';
import ky from 'ky';

const KakaoCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      const code = router.query.code as string;

      if (!code) return;

      try {
        const response = await ky.post('/api/auth/kakao', { code });

        console.log('로그인 성공:', response.data);

        router.push('/');
      } catch (error) {
        console.error('토큰 요청 실패:', error);
      }
    };

    fetchToken();
  }, [router]);

  return <div>카카오 로그인 중...</div>;
};

export default KakaoCallback;
