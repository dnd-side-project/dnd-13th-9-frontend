import React from 'react';
import {
  CheckListBox,
  CheckListBoxItem,
  CheckListBoxFavoriteItem,
  CheckListBoxSeparator,
} from '@/components/ui/CheckListBox';
import { TitleXs } from '@/components/ui/Typography';
import { Chip } from '@/components/ui/Chip';
import { useRouter } from 'next/navigation';
import { ChecklistSection as ChecklistSectionType, ChecklistItem } from '@/types/checklist';

type Props = {
  section: ChecklistSectionType;
  getSectionItems: (categoryName: string) => ChecklistItem[];
  isLastItem: (itemId: number, items: ChecklistItem[]) => boolean;
  hasRequiredItems: (items: ChecklistItem[]) => boolean;
};

export default function CheckListSection({
  section,
  getSectionItems,
  isLastItem,
  hasRequiredItems,
}: Props) {
  const items = section.items ?? getSectionItems(section.categoryName);
  const isRequiredCategory = section.categoryName === '필수 확인';
  const router = useRouter();

  if (isRequiredCategory && !hasRequiredItems(items)) {
    return (
      <CheckListBox className="w-full py-3">
        <div className="flex flex-col gap-4 px-4 py-4 pt-3">
          <div className="flex w-full flex-col items-center gap-3">
            <TitleXs className="text-neutral-70">아직 필수 확인 항목이 없습니다</TitleXs>
            <Chip text="필수항목 추가하기" size="sm" onClick={() => router.push('../checklist')} />
          </div>
        </div>
      </CheckListBox>
    );
  }

  return (
    <CheckListBox className="w-full py-3">
      <div className="flex flex-col gap-4 px-4 py-4 pt-3">
        {items.map((item: ChecklistItem) => (
          <React.Fragment key={item.itemId}>
            <CheckListBoxItem question={item.question} description={item.description} />

            {!isLastItem(item.itemId, items) && <CheckListBoxSeparator />}
          </React.Fragment>
        ))}
      </div>
    </CheckListBox>
  );
}
