'use client';
import React, { useEffect } from 'react';
import { MainLayout } from '@/components/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import BaseInfo from '@/components/HouseMemo/BaseInfo/BaseInfo';
import { AddImgButtonGroup } from '@/components/HouseMemo/AddImgGroup';
import HouseMemoProvider from '@/contexts/HouseMemoContext';
import CheckList from '@/components/HouseMemo/CheckList/CheckList';
import { useChecklistInfo } from '@/queries/houseMemo/useChecklistInfo';
import useModal from '@/hooks/useModal';
import { Header } from '@/components/ui/Header';
import { Icon } from '@/components/ui/Icon';
import { TitleS } from '@/components/ui/Typography';
import { ChecklistGuideModal } from '@/components/HouseMemo/ChecklistGuideModal';
import { useRouter } from 'next/navigation';

export default function page() {
  const { isOpen, closeModal, openModal } = useModal();
  const router = useRouter();

  const { data } = useChecklistInfo();

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
              onClick={() => window.history.back()}
            />
          }
          title="매물 메모"
          right={
            <TitleS
              className="text-primary-50 px-3 whitespace-nowrap"
              onClick={() => router.push('house-memo/select-map-list')}
            >
              완료
            </TitleS>
          }
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

      <ChecklistGuideModal isOpen={isOpen} closeModal={closeModal} />
    </MainLayout>
  );
}
