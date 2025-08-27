'use client';
import { getKakaoAuthURL } from '@/utils/kakao';
import { Icon } from '../Icon';
import { TitleXs } from '../Typography';

export const KakaoLoginButton = () => {
  const handleLogin = () => {
    window.location.href = getKakaoAuthURL();
  };

  return (
    <button
      className="flex w-80 items-center justify-center gap-1 rounded-xl bg-[#FAE100] px-2 py-3 md:w-96"
      onClick={handleLogin}
    >
      <Icon name="kakao" />
      <TitleXs>카카오로 3초만에 로그인</TitleXs>
    </button>
  );
};
