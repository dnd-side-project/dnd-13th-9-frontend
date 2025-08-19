import React from 'react';
import { Icon } from '@/components/ui/Icon';
import { Button } from '@/components/ui/Button';
import { TitleXs } from '@/components/ui/Typography';
import BaseInfoForm from './BaseInfoForm/BaseInfoForm';

export default function BaseInfo() {
  return (
    <div className="relative">
      <BaseInfoForm />

      <Button size="large" className="fixed bottom-4 w-82 gap-2 md:w-100">
        <div className="flex items-center">
          <TitleXs className="whitespace-nowrap"></TitleXs>
          <Icon name="arrowDown" width={20} height={20} />
        </div>
      </Button>
    </div>
  );
}
