import React from 'react';
import { Meta, StoryFn } from '@storybook/nextjs';

import { IconTextRouter } from './IconTextRouter';

export default {
  title: 'Components/main/IconTextRouter',
  component: IconTextRouter,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    routePath: { control: 'text' },
    icoPath: { control: 'text' },
  },
} as Meta<typeof IconTextRouter>;

const mockRouter = {
  push: (path: string) => console.log('Mock push to', path),
};

const Template: StoryFn<React.ComponentProps<typeof IconTextRouter>> = (args) => (
  <IconTextRouter {...args} router={mockRouter} />
);

export const Default = Template.bind({});
Default.args = {
  label: '바로 메모',
  routePath: '/memo',
  icoPath: '/assets/ico-memo.svg',
};
