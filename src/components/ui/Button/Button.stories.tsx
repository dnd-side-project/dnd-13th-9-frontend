import type { Meta, StoryObj } from '@storybook/nextjs';
import { fn } from 'storybook/test';
import Image from 'next/image';

import { Button } from './Button';

const meta = {
  title: 'COMPONENTS/common/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'tertiary'],
      description: '버튼 색상 스타일',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: '버튼 크기',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태',
    },
    children: {
      control: 'text',
      description: '버튼 안의 내용 (label보다 우선)',
    },
  },
  args: {
    onClick: fn(),
    label: '버튼',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본(Primary) 버튼
export const Basic: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    label: 'Text',
  },
};

// 작은 버튼
export const medium: Story = {
  args: {
    size: 'medium',
    label: 'medium Button',
  },
};

// 큰 버튼
export const large: Story = {
  args: {
    size: 'large',
    label: 'large Button',
  },
};

// 비활성화 버튼
export const disabled: Story = {
  args: {
    disabled: true,
    label: 'disabled',
  },
};

// 로딩 버튼
export const loading: Story = {
  args: {
    loading: true,
    label: '로딩 중',
  },
};

// children
export const IconButton: Story = {
  args: {
    variant: 'primary',
    children: (
      <span className="inline-flex items-center gap-1">
        <Image src="/assets/ico_arrow_down.svg" alt="ico_arrow_down" width={20} height={20} />
        Text
      </span>
    ),
  },
};
