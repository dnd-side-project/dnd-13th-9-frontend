import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';

import { AddImgButtonGroup } from './AddImgButtonGroup';

const meta: Meta<typeof AddImgButtonGroup> = {
  title: 'Components/house-memo/AddImgButtonGroup',
  component: AddImgButtonGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AddImgButtonGroup>;

export const Default: Story = {};
