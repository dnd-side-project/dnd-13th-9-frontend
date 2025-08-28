'use client';
import React from 'react';
import { MainLayout } from '@/components/layout';
import { AddImgButtonGroup } from '@/components/HouseMemo/AddImgGroup';
import { NearbyInfoForm } from '@/components/NearbyMemo/NaerbyInfoForm';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Icon } from '@/components/ui/Icon';
import { DeleteDataModal } from '@/components/ui/DeleteDataModal';
import { NearbyMemoProvider, useNearbyMemo } from '@/contexts';
import { useRouter } from 'next/navigation';
import { nearbyMemoValidationSchema, validateWithZod } from '@/utils/validation';
import useModal from '@/hooks/useModal';

function NearbyMemoPageContent() {
  const { nearbyMemo } = useNearbyMemo();
  const {
    isOpen: isDeleteModalOpen,
    closeModal: closeDeleteModal,
    openModal: openDeleteModal,
  } = useModal();
  const router = useRouter();

  const handleSave = () => {
    const validationData = {
      title: nearbyMemo.title,
      address: nearbyMemo.address,
      placeTag: nearbyMemo.placeTag,
    };

    validateWithZod(nearbyMemoValidationSchema, validationData, () => {
      router.push('/map/nearby-memo/select-map-list');
    });
  };

  const handleBackClick = () => {
    openDeleteModal();
  };

  const handleDeleteConfirm = () => {
    closeDeleteModal();
    localStorage.removeItem('nearbyMemo');
    localStorage.removeItem('nearbyInfoImg');
    router.back();
  };

  return (
    <MainLayout>
      <Header
        left={
          <Icon
            name="arrowLeft"
            color="neutral"
            className="cursor-pointer"
            size={22}
            onClick={handleBackClick}
          />
        }
        title="장소 메모"
      />
      <div className="px-4">
        <AddImgButtonGroup storageKey="nearbyInfoImg" readonly={false} />
      </div>
      <NearbyInfoForm />

      <Button
        size="large"
        label="저장하기"
        className="bg-secondary-50 fixed bottom-5 left-1/2 w-full max-w-[390px] -translate-x-1/2 hover:bg-amber-500"
        onClick={handleSave}
      />

      <DeleteDataModal
        isOpen={isDeleteModalOpen}
        closeModal={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
      />
    </MainLayout>
  );
}

export default function page() {
  return (
    <NearbyMemoProvider>
      <NearbyMemoPageContent />
    </NearbyMemoProvider>
  );
}
