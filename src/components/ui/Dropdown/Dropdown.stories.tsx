import type { Meta, StoryObj } from '@storybook/nextjs';

import { Dropdown, DropdownContent } from './index';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/common/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Basic: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger title="필수 확인" className="min-w-[350px]" />
      <DropdownContent className="flex max-w-[350px] flex-col gap-4 px-4 py-4 pt-6">
        <Dropdown.BaseItem
          question="전체적으로 깔끔한 편인가요?"
          description="벽지와 장판 오염이 많을 경우 도배 가능한지 문의하세요"
        />

        <Dropdown.BaseItem
          question="전체적으로 깔끔한 편인가요?"
          description="벽지와 장판 오염이 많을 경우 도배 가능한지 문의하세요"
        />

        <Dropdown.BaseItem
          question="전체적으로 깔끔한 편인가요?"
          description="벽지와 장판 오염이 많을 경우 도배 가능한지 문의하세요"
        />
        <Dropdown.Separator />
        <Dropdown.TextAreaItem
          placeholder="체크리스트를 보며 메모를 작성해보세요."
          onChange={(val) => console.log(val)}
        />
      </DropdownContent>
    </Dropdown>
  ),
};

export const FavoriteItem: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger title="필수 확인" className="min-w-[350px]" />
      <DropdownContent className="flex max-w-[350px] flex-col gap-4 px-4 py-4 pt-6">
        <Dropdown.FavoriteItem
          question="수압이 좋은 집인가요?"
          onClick={() => alert('즐겨찾기 클릭!')}
          description="세면대, 샤워기를 틀어 놓고 변기 물을 내려보세요"
        />
        <Dropdown.FavoriteItem
          question="수압이 좋은 집인가요?"
          onClick={() => alert('즐겨찾기 클릭!')}
          description="세면대, 샤워기를 틀어 놓고 변기 물을 내려보세요"
        />

        <Dropdown.FavoriteItem
          question="수압이 좋은 집인가요?"
          onClick={() => alert('즐겨찾기 클릭!')}
          description="세면대, 샤워기를 틀어 놓고 변기 물을 내려보세요"
        />
        <Dropdown.Separator />
        <Dropdown.TextAreaItem
          placeholder="체크리스트를 보며 메모를 작성해보세요."
          onChange={(val) => console.log(val)}
        />
      </DropdownContent>
    </Dropdown>
  ),
};
