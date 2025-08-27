import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/Tabs';
import CheckListSection from './CheckListSection';
import { TextArea } from '@/components/ui/TextArea';
import { TitleM } from '@/components/ui/Typography';
import { Icon } from '@/components/ui/Icon';
import { useHouseMemo } from '@/contexts/HouseMemoContext';
//todo: suspense, 타입 추가

type Props = {
  categories: any[];
  sections: any[];
  getSectionItems: (categoryName: string) => any[];
  isLastItem: (itemId: string, items: any[]) => boolean;
  hasRequiredItems: (items: any[]) => boolean;
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
  const { houseMemo, setHouseMemo } = useHouseMemo();

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
          {
            categoryId: currentCategory.categoryId,
            memo: value,
          },
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
              iconName="example"
              key={category.order}
              value={category.name}
              text={category.name}
            />
          ))}
        </TabsList>

        {sections.map((section) => (
          <TabsContent key={section.categoryName} value={section.categoryName}>
            <div className="pb-[200px]">
              <CheckListSection
                section={section}
                getSectionItems={getSectionItems}
                isLastItem={isLastItem}
                hasRequiredItems={hasRequiredItems}
              />
            </div>

            <div className="fixed bottom-0 left-1/2 flex w-105 -translate-x-1/2 flex-col gap-4 rounded-t-2xl bg-white px-4 py-4 shadow-2xl">
              <div className="flex w-full justify-between px-2">
                <div className="flex items-center gap-4">
                  <Icon
                    name="spinnerLeft"
                    width={10}
                    className="cursor-pointer transition-opacity hover:opacity-70"
                    onClick={() => {
                      const currentIndex = categories.findIndex((cat) => cat.name === activeTab);
                      const prevIndex = currentIndex > 0 ? currentIndex - 1 : categories.length - 1;
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
                      const nextIndex = currentIndex < categories.length - 1 ? currentIndex + 1 : 0;
                      handleTabChange(categories[nextIndex].name);
                    }}
                  />
                </div>
              </div>

              <TextArea
                className="h-32 py-2"
                maxLength={200}
                value={memoText}
                onChange={(e) => handleMemoChange(e.target.value)}
                placeholder="위 확인 사항을 참고해 메모를 작성해보세요."
              />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
