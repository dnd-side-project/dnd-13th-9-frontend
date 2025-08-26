'use client';
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout';
import { FolderSelector } from '@/components/HouseMemo/FolderSelector';
import { Header } from '@/components/ui/Header';
import { Icon } from '@/components/ui/Icon';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function page() {
  const router = useRouter();
  const [selectedFolderId, setSelectedFolderId] = useState<number | undefined>(undefined);

  const handleFolderSelect = (folderId: number) => {
    setSelectedFolderId(folderId);
  };

  const handleSave = () => {
    if (selectedFolderId !== undefined) {
      console.log('Selected folder:', selectedFolderId);
      // TODO: 실제 저장 로직 구현
      router.back();
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
        <Button label="저장하기" size="large" onClick={handleSave} disabled={!selectedFolderId} />
      </div>
    </MainLayout>
  );
}
