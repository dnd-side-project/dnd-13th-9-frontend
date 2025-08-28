'use client';
import React, { useEffect, useState } from 'react';
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
import { DeleteDataModal } from '@/components/ui/DeleteDataModal';
import { useRouter } from 'next/navigation';
import { useHouseMemo } from '@/contexts/HouseMemoContext';
import { houseMemoValidationSchema, validateWithZod } from '@/utils/validation';

function HouseMemoContent() {
  const { isOpen, closeModal, openModal } = useModal();
  const {
    isOpen: isDeleteModalOpen,
    closeModal: closeDeleteModal,
    openModal: openDeleteModal,
  } = useModal();
  const router = useRouter();
  const { houseMemo } = useHouseMemo();
  const [activeTab, setActiveTab] = useState('baseInfo');

  const { data } = useChecklistInfo();

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('hasVisitedHouseMemo');

    if (data?.data.sections?.[0].items?.length === 0 && !hasVisitedBefore) {
      openModal();
      localStorage.setItem('hasVisitedHouseMemo', 'true');
    }
  }, [data, openModal]);

  const handleComplete = () => {
    const validationData = {
      contractType: houseMemo.contractType,
      address: houseMemo.address,
      propertyName: houseMemo.propertyName,
    };

    validateWithZod(houseMemoValidationSchema, validationData, () => {
      router.push('house-memo/select-map-list');
    });
  };

  const handleBackClick = () => {
    openDeleteModal();
  };

  const handleDeleteConfirm = () => {
    closeDeleteModal();
    localStorage.removeItem('houseMemo');
    localStorage.removeItem('images');
    router.back();
  };

  const handleNextClick = () => {
    setActiveTab('checkList');
  };

  return (
    <>
      <Header
        left={
          <Icon
            name="arrowLeft"
            color="neutral"
            className="cursor-pointer"
            size={24}
            onClick={handleBackClick}
          />
        }
        title="매물 메모"
        right={
          activeTab == 'checkList' && (
            <TitleS
              className="text-primary-50 cursor-pointer px-3 whitespace-nowrap"
              onClick={handleComplete}
            >
              저장
            </TitleS>
          )
        }
      />
      <div className="px-4">
        <AddImgButtonGroup storageKey="images" />
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="sticky top-0 z-20 w-full bg-white px-6">
          <TabsList>
            <TabsTrigger.Bar value="baseInfo">기본 정보</TabsTrigger.Bar>
            <TabsTrigger.Bar value="checkList">체크리스트</TabsTrigger.Bar>
          </TabsList>
        </div>

        <TabsContent value="baseInfo">
          <BaseInfo onNextClick={handleNextClick} />
        </TabsContent>
        <TabsContent value="checkList">
          <CheckList />
        </TabsContent>
      </Tabs>

      <ChecklistGuideModal isOpen={isOpen} closeModal={closeModal} />
      <DeleteDataModal
        isOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}

export default function page() {
  return (
    <MainLayout>
      <HouseMemoProvider>
        <HouseMemoContent />
      </HouseMemoProvider>
    </MainLayout>
  );
}
