import type { Meta, StoryObj } from '@storybook/nextjs';

import { CurrentLocationButton } from './CurrentLocationButton';

const meta: Meta<typeof CurrentLocationButton> = {
  title: 'Components/common/CurrentLocationButton',
  component: CurrentLocationButton,
  tags: ['autodocs'],
  args: {
    onClick: () => alert('현재 위치 버튼 클릭!'),
  },
};

export default meta;
type Story = StoryObj<typeof CurrentLocationButton>;

export const Default: Story = {
  args: {
    onClick: () => alert('현재 위치 버튼 클릭!'),
  },
};

export const WithCustomClass: Story = {
  args: {
    onClick: () => alert('커스텀 클래스 버튼 클릭!'),
    className: 'bg-gray-200 rounded-md p-2',
  },
};
