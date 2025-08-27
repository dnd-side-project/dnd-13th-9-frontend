import type { Meta, StoryObj } from '@storybook/nextjs';

import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/common/Chip',
  component: Chip,
  tags: ['autodocs'],
  args: {
    text: 'Example Chip',
    variant: 'primary',
    size: 'md',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'neutral'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Primary: Story = {
  args: {
    text: 'Primary Chip',
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    text: 'Secondary Chip',
    variant: 'secondary',
    size: 'md',
  },
};

export const Neutral: Story = {
  args: {
    text: 'Neutral Chip',
    variant: 'neutral',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    text: 'Small Chip',
    variant: 'primary',
    size: 'sm',
  },
};

export const SmallSecondary: Story = {
  args: {
    text: 'Small Secondary',
    variant: 'secondary',
    size: 'sm',
  },
};

export const SmallNeutral: Story = {
  args: {
    text: 'Small Neutral',
    variant: 'neutral',
    size: 'sm',
  },
};

export const WithIcon: Story = {
  args: {
    text: 'Chip with Icon',
    variant: 'primary',
    size: 'md',
    iconName: 'folder',
  },
};

export const SmallWithIcon: Story = {
  args: {
    text: 'Small with Icon',
    variant: 'secondary',
    size: 'sm',
    iconName: 'angryFill',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Chip text="Primary MD" variant="primary" size="md" />
      <Chip text="Secondary MD" variant="secondary" size="md" />
      <Chip text="Neutral MD" variant="neutral" size="md" />
      <Chip text="Primary SM" variant="primary" size="sm" />
      <Chip text="Secondary SM" variant="secondary" size="sm" />
      <Chip text="Neutral SM" variant="neutral" size="sm" />
    </div>
  ),
};
