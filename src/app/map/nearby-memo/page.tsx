'use client';
import React from 'react';
import { MainLayout } from '@/components/layout';
import { AddImgButtonGroup } from '@/components/HouseMemo/AddImgGroup';
import { NearbyInfoForm } from '@/components/NearbyMemo/NaerbyInfoForm';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Icon } from '@/components/ui/Icon';
import { NearbyMemoProvider, useNearbyMemo } from '@/contexts';
import { useRouter } from 'next/navigation';
import { nearbyMemoValidationSchema, validateWithZod } from '@/utils/validation';

function NearbyMemoPageContent() {
  const { nearbyMemo } = useNearbyMemo();
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

  return (
    <MainLayout>
      <Header
        left={
          <Icon
            name="arrowLeft"
            color="neutral"
            className="cursor-pointer"
            size={22}
            padding={10}
            onClick={() => window.history.back()}
          />
        }
        title="장소 메모"
      />
      <AddImgButtonGroup storageKey="nearbyInfoImg" />
      <NearbyInfoForm />

      <Button
        size="large"
        label="저장하기"
        className="bg-secondary-50 fixed bottom-5 left-1/2 w-full max-w-[390px] -translate-x-1/2 hover:bg-amber-500"
        onClick={handleSave}
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
