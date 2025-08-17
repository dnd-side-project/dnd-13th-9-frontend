import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';

import { TabBox, TabBoxList, TabBoxTrigger, TabBoxContent } from '@/components/ui/TabBox';
import { Icon } from '@/components/ui/Icon/Icon';

const meta = {
  title: 'components/common/TabBox',
  component: TabBox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '독립 TabBox 컨텍스트를 사용하는 pill 스타일 탭입니다.',
      },
    },
  },
  argTypes: {
    defaultValue: {
      description: '초기 활성 탭 값',
      control: { type: 'text' },
      defaultValue: 'map',
    },
  },
} satisfies Meta<typeof TabBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: { defaultValue: 'map' } as { defaultValue: string },
  render: ({ defaultValue }: { defaultValue: string }) => (
    <TabBox defaultValue={defaultValue}>
      <div className="flex w-full items-center justify-between">
        <TabBoxList className="fit-content">
          <TabBoxTrigger value="map" leadingIcon={<Icon name="map" size={18} />}>
            맵
          </TabBoxTrigger>
          <TabBoxTrigger value="list" leadingIcon={<Icon name="list" size={18} />}>
            리스트
          </TabBoxTrigger>
        </TabBoxList>
      </div>
      <div className="mt-4" />
      <TabBoxContent value="map">지도 탭 내용</TabBoxContent>
      <TabBoxContent value="list">리스트 탭 내용</TabBoxContent>
    </TabBox>
  ),
};
