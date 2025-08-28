import React from 'react';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { TitleXs } from '@/components/ui/Typography';
import { BaseInfoForm } from './BaseInfoForm';

type BaseInfoProps = {
  onNextClick: () => void;
};

export default function BaseInfo({ onNextClick }: BaseInfoProps) {
  return (
    <div className="relative px-6">
      <BaseInfoForm />

      <Button
        size="large"
        className="fixed bottom-4 left-1/2 flex w-86 -translate-x-1/2 items-center justify-center shadow-sm md:w-96"
        onClick={onNextClick}
      >
        <div className="flex gap-2">
          <TitleXs className="whitespace-nowrap">다음으로</TitleXs>
          <Icon name="arrowDown" width={20} height={20} />
        </div>
      </Button>
    </div>
  );
}
