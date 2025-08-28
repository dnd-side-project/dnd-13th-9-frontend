'use client';
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout';
import { TitleXl } from '@/components/ui/Typography';
import { BodyXl } from '@/components/ui/Typography';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import {
  CheckListBox,
  CheckListBoxFavoriteItem,
  CheckListBoxSeparator,
  CheckListTitle,
} from '@/components/ui/CheckListBox';
import { TitleXs } from '@/components/ui/Typography';
import { checkListData } from '@/app/checklist/checkListData';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/ui/Header';
import { Icon } from '@/components/ui/Icon';
import { useSendRequiredItems } from '@/queries/checkList/useSendRequiredItems';

export default function page() {
  const [sections, setSections] = useState(checkListData.sections);

  const toggleItemFill = (sectionName: string, itemId: number) => {
    setSections((prev) =>
      prev.map((section) =>
        section.categoryName === sectionName
          ? {
              ...section,
              items: section.items.map((item) =>
                item.id === itemId ? { ...item, isFill: !item.isFill } : item
              ),
            }
          : section
      )
    );
  };

  const { mutate, isPending } = useSendRequiredItems();

  const handleClick = () => {
    const filledIds = sections
      .flatMap((section) => section.items)
      .filter((item) => item.isFill)
      .map((item) => item.id);

    mutate({ itemIdList: filledIds });
  };

  return (
    <MainLayout className="bg-[#F0F5FB] pb-22">
      <Header
        className="bg-[#F0F5FB]"
        left={
          <Icon
            name="arrowLeft"
            color="neutral"
            className="cursor-pointer"
            size={22}
            onClick={() => window.history.back()}
          />
        }
        title="체크 리스트"
      />
      <div className="px-4">
        <div className="flex flex-col gap-2 px-2 py-2">
          <TitleXl>집 보기 전, 꼭 확인할 항목을 체크하세요!</TitleXl>
          <BodyXl className="text-neutral-70">
            별표 표시한 항목은 체크리스트 상단에 고정돼요.
          </BodyXl>
        </div>

        <Tabs defaultValue="필수 확인">
          <TabsList className="scrollbar-hidden overflow-scroll py-3">
            {checkListData.categories.map((category) => (
              <TabsTrigger.Chip
                key={category.order}
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

                  const iconName = isActive ? `${baseIcon}Fill` : baseIcon;
                  return iconName as any;
                }}
                value={category.name}
                text={category.name}
              />
            ))}
          </TabsList>

          {sections.map((section) => (
            <TabsContent key={section.categoryName} value={section.categoryName}>
              <CheckListBox>
                <CheckListTitle
                  title={section.categoryName}
                  iconName={(() => {
                    switch (section.categoryName) {
                      case '필수 확인':
                        return 'requiredFill';
                      case '메인 공간':
                        return 'mainSpaceFill';
                      case '창문':
                        return 'windowFill';
                      case '욕실':
                        return 'bathroomFill';
                      case '건물':
                        return 'buildingFill';
                      default:
                        return 'exampleFill';
                    }
                  })()}
                />

                <CheckListBoxSeparator />

                {section.categoryName === '필수 확인' ? (
                  (() => {
                    const favoriteItems = sections
                      .filter((s) => s.categoryName !== '필수 확인')
                      .flatMap((s) => s.items.filter((item) => item.isFill));

                    if (favoriteItems.length === 0) {
                      return (
                        <div className="flex w-full flex-col items-center py-6">
                          <TitleXs className="text-neutral-70">
                            '이것만큼은 꼭!' 하는 항목에
                          </TitleXs>
                          <TitleXs className="text-neutral-70">별표를 눌러보세요.</TitleXs>
                        </div>
                      );
                    }

                    return (
                      <div className="flex flex-col gap-4 px-4 py-4 pt-3">
                        {favoriteItems.map((item, index) => (
                          <React.Fragment key={`${item.id}-${index}`}>
                            <CheckListBoxFavoriteItem
                              question={item.question}
                              description={item.description}
                              isFill={true}
                              onClick={() =>
                                toggleItemFill(
                                  sections.find((s) => s.items.some((i) => i.id === item.id))
                                    ?.categoryName || '',
                                  item.id
                                )
                              }
                            />
                            {index !== favoriteItems.length - 1 && <CheckListBoxSeparator />}
                          </React.Fragment>
                        ))}
                      </div>
                    );
                  })()
                ) : (
                  <div className="flex flex-col gap-4 px-4 py-4 pt-3">
                    {section.items.map((item, index) => (
                      <React.Fragment key={item.id}>
                        <CheckListBoxFavoriteItem
                          question={item.question}
                          description={item.description}
                          isFill={Boolean(item.isFill)}
                          onClick={() => toggleItemFill(section.categoryName, item.id)}
                        />
                        {index !== section.items.length - 1 && <CheckListBoxSeparator />}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </CheckListBox>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <Button
        label="저장하기"
        onClick={handleClick}
        disabled={isPending}
        size="large"
        className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2"
      />
    </MainLayout>
  );
}
