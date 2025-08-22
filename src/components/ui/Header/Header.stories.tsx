import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';

import { Header } from './Header';

import { Icon } from '@/components/ui/Icon';
import { iconNames } from '@/components/ui/assets';
import { COLORS } from '@/utils/style/colors';

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
    leftIconName: {
      control: 'select',
      options: iconNames,
      description: '좌측 아이콘 이름 (left 미전달 시 동작)',
    },
    leftIconColor: {
      control: 'select',
      options: Object.keys(COLORS),
      description: '좌측 아이콘 색상',
    },
    rightIconName: {
      control: 'select',
      options: iconNames,
      description: '우측 아이콘 이름 (right 미전달 시 동작)',
    },
    rightIconColor: {
      control: 'select',
      options: Object.keys(COLORS),
      description: '우측 아이콘 색상',
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Main: Story = {
  args: {
    title: '홈',
    leftIconName: 'house',
    rightIconName: 'search',
    leftIconColor: 'black',
    rightIconColor: 'black',
    leftHref: '/',
  },
  render: (args) => (
    <div className="relative min-h-[220px] bg-white text-black">
      <Header {...args} />
    </div>
  ),
};

export const DefaultBack: Story = {
  args: {
    title: '타이틀',
  },
  render: (args) => (
    <div className="relative min-h-[220px] bg-white text-black">
      <Header
        {...args}
        // left 미전달 → 기본 back 버튼 표시
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
        rightIconName="search"
      />
    </div>
  ),
};

export const ActionsByProps: Story = {
  args: {
    title: '액션 예시',
  },
  render: (args) => (
    <div className="relative min-h-[220px] bg-white text-black">
      <Header {...args} leftIconName="arrowLeft" rightIconName="share" rightHref="/share" />
    </div>
  ),
};
