import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';

import { Header } from './Header';

import { Icon } from '@/components/ui/Icon';

const meta = {
  title: 'components/common/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '모바일 상단 헤더 컴포넌트입니다. 좌/중앙/우측 슬롯과 안전영역(safe-area)을 지원합니다.',
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: '센터 타이틀 텍스트 (center가 없을 때만 노출)' },
    center: { control: false },
    left: { control: false },
    leftBack: { control: 'boolean' },
    right: { control: false },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  args: {
    title: '타이틀',
  },
  render: (args) => (
    <div className="relative min-h-[220px] bg-white text-black">
      <Header
        {...args}
        left={<Icon name="house" color="primary-50" />}
        right={<Icon name="search" />}
      />
    </div>
  ),
};

export const DefaultBack: Story = {
  args: {
    title: '뒤로가기 leftBack',
  },
  render: (args) => (
    <div className="relative min-h-[220px] bg-white text-black">
      <Header
        {...args}
        // 기본 back 버튼 표시
        leftBack
      />
    </div>
  ),
};

export const WithTabsCenter: Story = {
  render: () => (
    <div className="relative min-h-[220px] bg-white text-black">
      <Header
        center={
          <div className="flex items-center gap-1 rounded-full bg-black/5 p-1">
            <div className="rounded-full bg-black px-3 py-1 text-sm text-white">맵</div>
            <div className="rounded-full bg-black/10 px-3 py-1 text-sm text-black">리스트</div>
          </div>
        }
        right={<Icon name="search" />}
      />
    </div>
  ),
};
