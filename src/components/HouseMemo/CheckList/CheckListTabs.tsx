import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/Tabs';
import CheckListSection from './CheckListSection';
import { TextArea } from '@/components/ui/TextArea';
import { TitleM } from '@/components/ui/Typography';
import { Icon } from '@/components/ui/Icon';
import { useHouseMemo } from '@/contexts/HouseMemoContext';
import { ChecklistCategory, ChecklistSection, ChecklistItem } from '@/types/checklist';
import { Fab } from '@/components/ui/Fab';

type Props = {
  categories: ChecklistCategory[];
  sections: ChecklistSection[];
  getSectionItems: (categoryName: string) => ChecklistItem[];
  isLastItem: (itemId: number, items: ChecklistItem[]) => boolean;
  hasRequiredItems: (items: ChecklistItem[]) => boolean;
};

export default function CheckListTabs({
  categories,
  sections,
  getSectionItems,
  isLastItem,
  hasRequiredItems,
}: Props) {
  const [memoText, setMemoText] = useState('');
  const [activeTab, setActiveTab] = useState(categories[0]?.name || '');
  const [isMemoOpen, setIsMemoOpen] = useState(false);
  const { houseMemo, setHouseMemo } = useHouseMemo();

  const processedSections = sections.map((section) => {
    if (section.categoryName === '필수 확인') {
      const requiredItems = sections
        .filter((s) => s.categoryName !== '필수 확인')
        .flatMap((s) => s.items.filter((item) => item.isFill));

      return { ...section, items: requiredItems };
    } else {
      return { ...section, items: section.items.filter((item) => !item.isFill) };
    }
  });

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleMemoChange = (value: string) => {
    setMemoText(value);

    const currentCategory = sections.find((s) => s.categoryName === activeTab);
    if (currentCategory) {
      const currentCategoryMemoList = houseMemo.categoryMemoList || [];
      const updatedMemo = {
        ...houseMemo,
        categoryMemoList: [
          ...currentCategoryMemoList.filter(
            (memo) => memo.categoryId !== currentCategory.categoryId
          ),
          { categoryId: currentCategory.categoryId, memo: value },
        ],
      };
      setHouseMemo(updatedMemo);
    }
  };

  useEffect(() => {
    if (activeTab && sections.length > 0) {
      const currentCategory = sections.find((s) => s.categoryName === activeTab);
      if (currentCategory) {
        const existingMemo = houseMemo.categoryMemoList?.find(
          (memo) => memo.categoryId === currentCategory.categoryId
        );
        setMemoText(existingMemo ? existingMemo.memo : '');
      }
    }
  }, [activeTab, sections, houseMemo.categoryMemoList]);

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="scrollbar-hidden overflow-scroll py-4">
          {categories.map((category) => (
            <TabsTrigger.Chip
              iconName={(isActive) => {
                const baseIcon = (() => {
                  switch (category.name) {
                    case '필수 확인':
                      return 'required';
                    case '메인 공간':
                      return 'mainSpace';
                    case '창문':
                      return 'window';
                    case '욕실':
                      return 'bathroom';
                    case '건물':
                      return 'building';
                    default:
                      return 'example';
                  }
                })();
                return (isActive ? `${baseIcon}Fill` : baseIcon) as any;
              }}
              key={category.order}
              value={category.name}
              text={category.name}
            />
          ))}
        </TabsList>

        {!isMemoOpen && (
          <div className="fixed right-65 bottom-18 translate-x-[130px] md:right-auto md:left-1/2 md:translate-x-[120px]">
            <Fab
              icon="edit"
              className="min-w-27 flex-row items-center gap-2"
              label="메모장"
              color="primary"
              onClick={() => setIsMemoOpen(true)}
            />
          </div>
        )}

        {processedSections.map((section) => (
          <TabsContent key={section.categoryName} value={section.categoryName}>
            <div className="pb-[200px]">
              <CheckListSection
                section={section}
                getSectionItems={getSectionItems}
                isLastItem={isLastItem}
                hasRequiredItems={hasRequiredItems}
              />
            </div>

            {isMemoOpen && (
              <div className="fixed bottom-0 left-1/2 flex w-full max-w-md -translate-x-1/2 flex-col gap-2 rounded-t-2xl bg-white px-4 py-4 shadow-lg md:max-w-lg md:gap-4 md:px-6 md:py-6 md:shadow-2xl lg:max-w-lg">
                <div className="flex w-full justify-between px-2">
                  <div className="flex items-center gap-2 md:gap-4">
                    <Icon
                      name="spinnerLeft"
                      width={10}
                      className="cursor-pointer transition-opacity hover:opacity-70"
                      onClick={() => {
                        const currentIndex = categories.findIndex((cat) => cat.name === activeTab);
                        const prevIndex =
                          currentIndex > 0 ? currentIndex - 1 : categories.length - 1;
                        handleTabChange(categories[prevIndex].name);
                      }}
                    />
                    <TitleM>{section.categoryName}</TitleM>
                    <Icon
                      name="spinnerRight"
                      width={10}
                      className="cursor-pointer transition-opacity hover:opacity-70"
                      onClick={() => {
                        const currentIndex = categories.findIndex((cat) => cat.name === activeTab);
                        const nextIndex =
                          currentIndex < categories.length - 1 ? currentIndex + 1 : 0;
                        handleTabChange(categories[nextIndex].name);
                      }}
                    />
                  </div>

                  <Icon
                    name="close"
                    width={16}
                    color="neutral"
                    className="cursor-pointer transition-opacity hover:opacity-70"
                    onClick={() => setIsMemoOpen(false)}
                  />
                </div>

                <TextArea
                  className="h-32 py-2"
                  maxLength={200}
                  value={memoText}
                  onChange={(e) => handleMemoChange(e.target.value)}
                  placeholder="위 확인 사항을 참고해 메모를 작성해보세요."
                />
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
