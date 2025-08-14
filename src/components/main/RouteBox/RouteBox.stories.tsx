import React from 'react';

import { RouteBox } from './RouteBox';

export default {
  title: 'Components/main/RouteBox',
  component: RouteBox,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    routePath: { control: 'text' },
    bgColor: { control: 'color' },
    textColor: { control: 'color' },
    size: { control: { type: 'select', options: ['small', 'large'] } },
  },
};

const mockRouter = {
  push: (path: string) => console.log('Mock push to', path),
};

const Template = (args) => <RouteBox {...args} router={mockRouter} />;

export const LargeBox = Template.bind({});
LargeBox.args = {
  title: '매물 지도',
  description: '지도 위에 메모해둬야지',
  routePath: '/map',
  bgColor: '#669AFF',
  size: 'large',
};

export const SmallBoxes = () => (
  <div className="flex flex-col gap-4">
    <RouteBox
      routePath="/checklist"
      title="체크리스트"
      description="집 볼 땐 어떤걸 확인해야돼?"
      bgColor="#FBA907"
      size="small"
      router={mockRouter}
    />
    <RouteBox
      routePath="/vote"
      title="최종 후보지 투표"
      description="친구야! 넌 어떻게 생각해?"
      bgColor="#F4F4F4"
      size="small"
      textColor="#000000"
      router={mockRouter}
    />
  </div>
);
