import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';

const meta = {
  title: 'components/common/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Tabs 하위 컴포넌트로 TabsList, TabsTrigger, TabsContent가 존재합니다.',
      },
    },
  },
  argTypes: {
    defaultValue: {
      description: '초기 활성 탭의 value를 설정합니다.',
      control: { type: 'text' },
      defaultValue: 'tab1',
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    defaultValue: 'tab1',
  },
  render: ({ defaultValue }) => (
    <Tabs defaultValue={defaultValue}>
      <TabsList>
        <TabsTrigger.Bar value="tab1">기본 정보</TabsTrigger.Bar>
        <TabsTrigger.Bar value="tab2">체크리스트</TabsTrigger.Bar>
        <TabsTrigger.Bar value="tab3">생활 동선</TabsTrigger.Bar>
      </TabsList>

      <TabsContent value="tab1">첫 번째 내용</TabsContent>
      <TabsContent value="tab2">두 번째 내용</TabsContent>
      <TabsContent value="tab3">세 번째 내용</TabsContent>
    </Tabs>
  ),
};

export const ChipTabs: Story = {
  args: {
    defaultValue: 'tab1',
  },
  render: ({ defaultValue }) => (
    <Tabs defaultValue={defaultValue}>
      <TabsList>
        <TabsTrigger.Chip value="tab1" text="필수 확인" />
        <TabsTrigger.Chip value="tab2" text="메인공간" />
        <TabsTrigger.Chip value="tab3" text="창문" />
      </TabsList>

      <TabsContent value="tab1">첫 번째 내용</TabsContent>
      <TabsContent value="tab2">두 번째 내용</TabsContent>
      <TabsContent value="tab3">세 번째 내용</TabsContent>
    </Tabs>
  ),
};
