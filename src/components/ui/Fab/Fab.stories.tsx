import type { Meta, StoryObj } from '@storybook/react';
import { Fab } from './Fab';
import React from 'react';

const meta: Meta<typeof Fab> = {
  title: 'Components/common/Fab',
  component: Fab,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    icon: 'locationAdd',
    color: 'primary',
  },
};
export default meta;

type Story = StoryObj<typeof Fab>;

export const Extended: Story = {
  args: { label: 'Text' },
};

export const IconOnly: Story = {
  args: { label: undefined },
};

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Fab icon="currentLocation" color="primary" />
      <Fab icon="currentLocation" color="white" />
      <Fab icon="currentLocation" color="neutral" />
    </div>
  ),
};
