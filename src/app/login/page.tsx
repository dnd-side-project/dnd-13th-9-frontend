'use client';
import { KakaoLoginButton } from '@/components/ui/KakaoLoginButton';
import { MainLayout } from '@/components/layout';

export default function LoginPage() {
  return (
    <MainLayout>
      <h1>로그인 페이지</h1>
      <KakaoLoginButton />
    </MainLayout>
  );
}
