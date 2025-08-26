'use client';
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout';
import { FolderSelector } from '@/components/HouseMemo/FolderSelector';
import { Header } from '@/components/ui/Header';
import { Icon } from '@/components/ui/Icon';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useCreateProperty } from '@/queries/houseMemo/useCreateHouseMemo';
import { useHouseMemo } from '@/contexts/HouseMemoContext';

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

  const handleSave = async () => {
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
      alert('매물 저장 중 오류가 발생했습니다.');
    }
  };

  return (
    <MainLayout>
      <Header
        className="px-3"
        left={<Icon name="arrowLeft" width={18} onClick={() => router.back()} />}
        title="저장 폴더 선택"
      />
      <FolderSelector
        selectedFolderId={selectedFolderId}
        onFolderSelect={handleFolderSelect}
        showCreateButton={true}
        showActionsMenu={true}
        showPlanGrid={true}
      />

      <div className="flex w-full justify-center py-3">
        <Button
          label="저장하기"
          size="large"
          onClick={handleSave}
          disabled={!selectedFolderId || createPropertyMutation.isPending}
          loading={createPropertyMutation.isPending}
        />
      </div>
    </MainLayout>
  );
}
