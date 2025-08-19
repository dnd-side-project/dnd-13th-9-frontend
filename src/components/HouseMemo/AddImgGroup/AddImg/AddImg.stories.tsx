import type { Meta, StoryObj } from '@storybook/nextjs';

import { AddImgButton } from './AddImgButton';

const meta: Meta<typeof AddImgButton> = {
  title: 'Components/house-memo/AddImgButton',
  component: AddImgButton,
  tags: ['autodocs'],
  args: {
    size: 'lg',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof AddImgButton>;

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};
