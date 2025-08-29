'use client';
import React, { useEffect } from 'react';
import { Header } from '@/components/ui/Header';
import { useLogout } from '@/queries/user/useLogout';
import { MainLayout } from '@/components/layout';
import { Button } from '@/components/ui/Button';
import { useMyPage } from '@/queries/user/useMyPage';
import { Loading } from '@/components/ui/Loading';
import { TitleS, TitleXs } from '@/components/ui/Typography';
import { Icon } from '@/components/ui/Icon';
import { useRouter } from 'next/navigation';

export default function MyPage() {
  const { data, isLoading, error, refetch, isFetching, isError } = useMyPage();
  const { mutate: logoutMutate, status } = useLogout();
  const router = useRouter();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading || isFetching) {
    return (
      <MainLayout className="px-4">
        <Loading />
      </MainLayout>
    );
  }

  if (!data) {
    return (
      <MainLayout className="px-4">
        <div className="space-y-4">
          <h1>정보 없음</h1>
          <p>사용자 정보를 찾을 수 없습니다.</p>
          <Button label="다시 시도" size="large" onClick={() => refetch()} />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout className="bg-coolGray-20 gap-2 px-4">
      <Header leftBack={true} title="나의 zip" className="bg-coolGray-20" />

      <div className="flex flex-col gap-4">
        <div className="bg-primary-50 flex items-center gap-2 rounded-xl px-5 py-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#A8C2F5]">
            <Icon name="myPage" color="#F0F5FB" />
          </div>
          <TitleS className="flex text-white">{data.data.name}</TitleS>
        </div>

        <div className="rounded-2xl bg-white">
          <button className="flex w-full items-center justify-between px-5 py-5">
            <div className="flex gap-2">
              <Icon name="messege" />
              <TitleXs className="text-primary-55">평가 및 피드백</TitleXs>
            </div>

            <Icon name="arrowRight" color="neutral" width={12} />
          </button>
          <button
            className="flex w-full items-center justify-between px-5 py-5"
            onClick={() => router.push('map?tab=list')}
          >
            <div className="flex gap-2">
              <Icon name="myNote" />
              <TitleXs>내 매물 메모</TitleXs>
              <TitleXs className="text-primary-55">{data.data.propertyCount}</TitleXs>
            </div>

            <Icon name="arrowRight" color="neutral" width={12} />
          </button>

          <button
            onClick={() => router.push('checklist')}
            className="flex w-full items-center justify-between px-5 py-5"
          >
            <div className="flex gap-2">
              <Icon name="myMemo" />
              <TitleXs>내 필수 체크리스트</TitleXs>
              <TitleXs className="text-primary-55">{data.data.checklistCount}</TitleXs>
            </div>

            <Icon name="arrowRight" color="neutral" width={12} />
          </button>
        </div>
        <Button
          label={'로그아웃'}
          size="large"
          className="text-neutral-70 hover:bg-neutral-30 bg-white"
          onClick={() => logoutMutate()}
        />
      </div>
    </MainLayout>
  );
}
