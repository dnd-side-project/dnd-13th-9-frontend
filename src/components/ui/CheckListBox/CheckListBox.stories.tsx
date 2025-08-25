import type { Meta, StoryObj } from '@storybook/nextjs';

import { CheckListBox } from './CheckListBox';
import { CheckListBoxItem } from './CheckListBoxItem';
import { CheckListBoxFavoriteItem } from './CheckListBoxFavoriteItem';
import { CheckListBoxSeparator } from './CheckListBoxSeparator';
import { CheckListTitle } from './CheckListTitle';

const meta: Meta<typeof CheckListBox> = {
  title: 'components/common/CheckListBox',
  component: CheckListBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: (
      <>
        <CheckListTitle title="필수 확인" />
        <CheckListBoxSeparator />
        <CheckListBoxFavoriteItem question="체감 면적은 넓은가요?" />
        <CheckListBoxSeparator />
        <CheckListBoxFavoriteItem
          question="뷰는 괜찮은가요?"
          description="다른 건물과 너무 가깝지는 않은지 확인하세요!"
        />
        <CheckListBoxSeparator />
        <CheckListBoxFavoriteItem question="층수는 어떻게 되나요?" />
        <CheckListBoxSeparator />
        <CheckListBoxFavoriteItem question="엘리베이터는 있나요?" />
      </>
    ),
  },
};

export const WithItems: Story = {
  args: {
    children: (
      <>
        <CheckListBoxItem question="너무 노후화되진 않았나요?" />
        <CheckListBoxSeparator />
        <CheckListBoxItem
          question="전체적으로 깔끔한 편인가요?"
          description="벽지와 장판 오염이 많을 경우 도배 가능한지 문의하세요"
        />
        <CheckListBoxSeparator />
        <CheckListBoxItem question="체감 면적은 넓은가요?" />
        <CheckListBoxSeparator />
        <CheckListBoxItem
          question="벌레 출몰 위험은 없나요?"
          description="주방에 까만 점이 있거나, 약을 둔 흔적이 있나요?"
        />
      </>
    ),
  },
};

export const WithFavoriteItems: Story = {
  args: {
    children: (
      <>
        <CheckListBoxFavoriteItem
          question="즐겨찾기 1"
          description="즐겨찾기 설명 1"
          isFill={true}
        />
        <CheckListBoxSeparator />
        <CheckListBoxFavoriteItem
          question="즐겨찾기 2"
          description="즐겨찾기 설명 2"
          isFill={false}
        />
        <CheckListBoxSeparator />
        <CheckListBoxFavoriteItem
          question="즐겨찾기 3"
          description="즐겨찾기 설명 3"
          isFill={true}
        />
      </>
    ),
  },
};
