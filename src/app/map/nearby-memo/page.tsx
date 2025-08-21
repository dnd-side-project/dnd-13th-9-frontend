'use client';
import React from 'react';
import { MainLayout } from '@/components/layout';
import { AddImgButtonGroup } from '@/components/HouseMemo/AddImgGroup';
import { NearbyInfoForm } from '@/components/NearbyMemo/NaerbyInfoForm';
import { Button } from '@/components/ui/Button';

export default function page() {
  return (
    <MainLayout className="px-6">
      <AddImgButtonGroup />
      <NearbyInfoForm />

      <Button
        size="large"
        label="저장하기"
        className="bg-secondary-50 fixed bottom-5 left-1/2 w-full max-w-[390px] -translate-x-1/2 hover:bg-amber-500"
      />
    </MainLayout>
  );
}
