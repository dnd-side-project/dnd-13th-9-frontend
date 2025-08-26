'use client';
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import BaseInfo from '@/components/HouseMemo/BaseInfo/BaseInfo';
import { AddImgButtonGroup } from '@/components/HouseMemo/AddImgGroup';
import HouseMemoProvider from '@/contexts/HouseMemoContext';
import CheckList from '@/components/HouseMemo/CheckList/CheckList';
import { useChecklistInfo } from '@/queries/houseMemo/useChecklistInfo';
import { Modal } from '@/components/ui/Modal';
import useModal from '@/hooks/useModal';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/ui/Header';
import { Icon } from '@/components/ui/Icon';

export default function page() {
  const { isOpen, closeModal, openModal } = useModal();

  const { data } = useChecklistInfo();

  const router = useRouter();

  useEffect(() => {
    if (data?.data.sections?.[0].items?.length === 0) {
    }
    openModal();
  }, [data]);

  return (
    <MainLayout>
      <HouseMemoProvider>
        <Header
          left={
            <Icon
              name="arrowLeft"
              color="neutral"
              className="cursor-pointer"
              size={24}
              padding={10}
              onClick={() => router.back()}
            />
          }
          title="매물 메모"
        />
        <AddImgButtonGroup />
        <Tabs defaultValue="baseInfo">
          <div className="px-6">
            <TabsList>
              <TabsTrigger.Bar value="baseInfo">기본 정보</TabsTrigger.Bar>
              <TabsTrigger.Bar value="checkList">체크 리스트</TabsTrigger.Bar>
            </TabsList>
          </div>

          <TabsContent value="baseInfo">
            <BaseInfo />
          </TabsContent>
          <TabsContent value="checkList">
            <CheckList />
          </TabsContent>
        </Tabs>
      </HouseMemoProvider>

      <Modal isOpen={isOpen} closeModal={closeModal}>
        <div className="flex flex-col items-center gap-2 rounded-2xl bg-white p-5 shadow-sm">
          <Image src="/assets/ico-alert.svg" alt="alert 아이콘" width={60} height={60} />
          <div className="flex flex-col items-center justify-center pb-4">
            <span className="text-xl font-semibold">매물 정보 기록 전에</span>
            <div className="flex flex-row">
              <span className="text-xl font-semibold text-[#669AFF]">체크리스트 생성</span>
              <span className="text-xl font-semibold">을 할 수 있어요!</span>
            </div>
          </div>

          <div className="flex flex-row gap-2">
            <Button onClick={closeModal} variant="tertiary" size="medium">
              취소
            </Button>
            <Button
              onClick={() => {
                closeModal();
                router.push('/checklist');
              }}
              size="medium"
            >
              바로 가기
            </Button>
          </div>
        </div>
      </Modal>
    </MainLayout>
  );
}
