import type { Meta, StoryObj } from '@storybook/nextjs';

import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/common/Chip',
  component: Chip,
  tags: ['autodocs'],
  args: {
    text: 'Example Chip',
    variant: 'primary',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Primary: Story = {
  args: {
    text: 'Primary Chip',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    text: 'Secondary Chip',
    variant: 'secondary',
  },
};
