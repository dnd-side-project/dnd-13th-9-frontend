import React from 'react';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { TitleXs } from '@/components/ui/Typography';
import { BaseInfoForm } from './BaseInfoForm';
import { useHouseMemo } from '@/contexts/HouseMemoContext';
import { formatHouseMemoForAPI } from '@/utils/houseMemoStorage';

export default function BaseInfo() {
  const { houseMemo } = useHouseMemo();

  const handleSave = () => {
    const formattedData = formatHouseMemoForAPI(houseMemo);
  };

  return (
    <div className="relative px-6">
      <BaseInfoForm />

      <Button
        size="large"
        className="fixed bottom-4 mx-auto flex w-96 items-center justify-center md:w-82"
        onClick={handleSave}
      >
        <div className="bottom-2 flex">
          <TitleXs className="whitespace-nowrap">아래로 내리기</TitleXs>
          <Icon name="arrowDown" width={20} height={20} />
        </div>
      </Button>
    </div>
  );
}
