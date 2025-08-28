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
      className="flex w-full cursor-pointer items-center justify-center gap-1 rounded-2xl bg-[#FAE100] px-2 py-3 text-[#3C1E1E] md:w-96"
      onClick={handleLogin}
    >
      <Icon name="kakao" />
      <TitleXs>카카오로 시작하기</TitleXs>
    </button>
  );
};
