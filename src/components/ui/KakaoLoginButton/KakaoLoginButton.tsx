'use client';
import { getKakaoAuthURL } from '@/utils/kakao';

export const KakaoLoginButton = () => {
  const handleLogin = () => {
    window.location.href = getKakaoAuthURL();
  };

  return <button onClick={handleLogin}>카카오 로그인</button>;
};
