import React from 'react';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { TitleXs } from '@/components/ui/Typography';
import { BaseInfoForm } from './BaseInfoForm';
import { MainLayout } from '@/components/layout';

type Props = {
  onNextClick: () => void;
};

export default function BaseInfo({ onNextClick }: Props) {
  return (
    <div className="relative px-6">
      <BaseInfoForm />

      <div className="fixed bottom-0 left-1/2 z-10 w-full max-w-110 -translate-x-1/2 bg-white pb-[env(safe-area-inset-bottom)]">
        <div className="flex justify-center px-6 py-4">
          <Button size="large" className="w-86 shadow-sm md:w-96" onClick={onNextClick}>
            <div className="flex items-center justify-center gap-2">
              <TitleXs className="whitespace-nowrap">다음으로</TitleXs>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
