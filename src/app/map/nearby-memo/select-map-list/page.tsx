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

  const handleSave = async () => {
    if (selectedFolderId === undefined) return;

    try {
      await createNearbyMemoMutation.mutateAsync({
        selectedFolderId,
      });
    } catch (error) {
      console.error('Save error:', error);
    }
  };

  return (
    <MainLayout>
      <Header
        className="px-3"
        left={<Icon name="arrowLeft" width={18} onClick={() => router.back()} />}
        title="저장 폴더 선택"
      />

      <div>
        <FolderSelector
          selectedFolderId={selectedFolderId}
          onFolderSelect={handleFolderSelect}
          showCreateButton={true}
          showActionsMenu={true}
          showPlanGrid={true}
        />

        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 transform">
          <Button
            label="저장하기"
            size="large"
            onClick={handleSave}
            disabled={!selectedFolderId || createNearbyMemoMutation.isPending}
            loading={createNearbyMemoMutation.isPending}
          />
        </div>
      </div>
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
