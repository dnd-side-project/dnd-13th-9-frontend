import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';

import { BottomSheet } from './BottomSheet';
import { Button } from '../Button';

import { useBottomSheet } from '@/hooks/useBottomSheet';

const meta: Meta<typeof BottomSheet> = {
  title: 'components/common/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

export const Basic: Story = {
  render: (args) => {
    const { isOpen, open, close } = useBottomSheet(false);

    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <Button onClick={open} variant="primary" size="medium">
          Bottom Sheet 열기
        </Button>

        <BottomSheet {...args} isOpen={isOpen} closeModal={close}>
          <div className="flex w-full flex-col gap-4 p-5">
            <Button variant="primary" size="large">
              사진 촬영하기
            </Button>
            <Button variant="tertiary" size="large">
              앨범에서 선택하기
            </Button>
          </div>
        </BottomSheet>
      </div>
    );
  },
};
