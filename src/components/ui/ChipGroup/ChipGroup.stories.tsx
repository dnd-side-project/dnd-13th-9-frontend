import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';

import { ChipGroup } from '../ChipGroup/ChipGroup';

const meta: Meta<typeof ChipGroup> = {
  title: 'Components/common/ChipGroup',
  component: ChipGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ChipGroup>;

export const Default: Story = {
  render: () => {
    type OptionType = 'Option 1' | 'Option 2' | 'Option 3';
    const options = [{ text: 'Option 1' }, { text: 'Option 2' }, { text: 'Option 3' }];

    const [value, setValue] = useState<OptionType>('Option 1');

    return (
      <div style={{ padding: '20px' }}>
        <ChipGroup<OptionType> options={options} value={value} onChange={(val) => setValue(val)} />
      </div>
    );
  },
};
