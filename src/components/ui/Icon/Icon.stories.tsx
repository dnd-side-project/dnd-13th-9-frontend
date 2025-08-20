import type { Meta, StoryObj } from '@storybook/nextjs';

import { Icon } from './Icon';
import { iconNames } from '../assets';

import { COLORS } from '@/utils/style/colors';

const meta = {
  title: 'components/common/Icon',
  component: Icon,
  tags: ['autodocs'],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof Icon>;

export const Basic: Story = {
  args: {
    color: 'neutral',
    size: 25,
  },
  argTypes: {
    name: { table: { disable: true } },
    color: { control: { type: 'select' }, options: Object.keys(COLORS) },
    size: { control: { type: 'number' } },
  },
  render: (args) => {
    return (
      <div className="grid grid-cols-6 gap-4">
        {iconNames.map((icon) => (
          <div key={icon} className="flex justify-center">
            <Icon {...args} name={icon} />
          </div>
        ))}
      </div>
    );
  },
};
