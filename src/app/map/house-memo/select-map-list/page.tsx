'use client';
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout';
import { FolderSelector } from '@/components/HouseMemo/FolderSelector';
import { Header } from '@/components/ui/Header';
import { Icon } from '@/components/ui/Icon';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useHouseMemo } from '@/contexts/HouseMemoContext';
import { useCreateProperty } from '@/queries/houseMemo/useCreateHouseMemo';

export default function page() {
  const router = useRouter();
  const [selectedFolderId, setSelectedFolderId] = useState<number | undefined>(undefined);
  const { houseMemo } = useHouseMemo();
  const createPropertyMutation = useCreateProperty();

  const getImagesFromStorage = () => {
    if (typeof window === 'undefined') return [];
    try {
      return JSON.parse(localStorage.getItem('images') || '[]');
    } catch (error) {
      console.error('Failed to parse images from localStorage:', error);
      return [];
    }
  };

  const handleFolderSelect = (folderId: number) => {
    setSelectedFolderId(folderId);
  };

  async function handleFormAction(formData: FormData) {
    if (selectedFolderId === undefined) return;

    try {
      const images = getImagesFromStorage();

      await createPropertyMutation.mutateAsync({
        houseMemo,
        selectedFolderId,
        images,
      });

      router.back();
    } catch (error) {
      console.error('Form action error:', error);
    }
  }

  return (
    <MainLayout>
      <Header
        className="px-3"
        left={<Icon name="arrowLeft" width={18} onClick={() => router.back()} />}
        title="저장 폴더 선택"
      />

      <form action={handleFormAction}>
        <FolderSelector
          selectedFolderId={selectedFolderId}
          onFolderSelect={handleFolderSelect}
          showCreateButton={true}
          showActionsMenu={true}
          showPlanGrid={true}
        />

        <div className="bottom-0 flex w-full justify-center py-3">
          <Button
            label="저장하기"
            size="large"
            type="submit"
            disabled={!selectedFolderId || createPropertyMutation.isPending}
            loading={createPropertyMutation.isPending}
          />
        </div>
      </form>
    </MainLayout>
  );
}
