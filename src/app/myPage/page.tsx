'use client';
import React from 'react';
import { useMyInfo } from '@/queries/user/useMyInfo';
import { useLogout } from '@/queries/user/useLogout';
import { MainLayout } from '@/components/layout';
import { Button } from '@/components/ui/Button';

export default function MyPage() {
  const { data } = useMyInfo();
  const { mutate: logoutMutate, status } = useLogout();

  if (!data) return <MainLayout>정보없음</MainLayout>;

  return (
    <MainLayout className="px-4">
      <h1>유저 정보</h1>
      <p>이름: {data.data.name}</p>
      <p>Provider ID: {data.data.providerId}</p>
      <p>Role: {data.data.role}</p>

      <Button label={'로그아웃'} size="large" onClick={() => logoutMutate()} />
    </MainLayout>
  );
}
