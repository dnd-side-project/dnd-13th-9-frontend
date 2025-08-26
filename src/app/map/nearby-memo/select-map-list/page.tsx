'use client';
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout';
import { FolderSelector } from '@/components/HouseMemo/FolderSelector';
import { Header } from '@/components/ui/Header';
import { Icon } from '@/components/ui/Icon';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { NearbyMemoProvider } from '@/contexts';
import { useCreateNearbyMemo } from '@/queries/nearbyMemo/useCreateNearbyMemo';

function SelectMapListContent() {
  const router = useRouter();
  const [selectedFolderId, setSelectedFolderId] = useState<number | undefined>(undefined);
  const createNearbyMemoMutation = useCreateNearbyMemo();

  const handleFolderSelect = (folderId: number) => {
    setSelectedFolderId(folderId);
  };

  async function handleFormAction(formData: FormData) {
    if (selectedFolderId === undefined) return;

    try {
      await createNearbyMemoMutation.mutateAsync({
        selectedFolderId,
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
            disabled={!selectedFolderId || createNearbyMemoMutation.isPending}
            loading={createNearbyMemoMutation.isPending}
          />
        </div>
      </form>
    </MainLayout>
  );
}

export default function page() {
  return (
    <NearbyMemoProvider>
      <SelectMapListContent />
    </NearbyMemoProvider>
  );
}
