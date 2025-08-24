'use client';
import React from 'react';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/Tabs';
import {
  CheckListBox,
  CheckListBoxItem,
  CheckListBoxFavoriteItem,
  CheckListBoxSeparator,
} from '@/components/ui/CheckListBox';
import { checkListData } from '../../../app/checklist/checkListData';
import { TitleXs } from '@/components/ui/Typography';

export default function CheckList() {
  return (
    <div className="bg-coolGray-20 min-h-lvw px-6 py-2">
      <Tabs defaultValue="필수 확인">
        <TabsList className="overflow-scroll py-3">
          {checkListData.categories.map((category) => (
            <TabsTrigger.Chip
              iconName="example"
              key={category.order}
              value={category.name}
              text={category.name}
            />
          ))}
        </TabsList>

        {checkListData.sections.map((section) => (
          <TabsContent key={section.categoryName} value={section.categoryName}>
            <CheckListBox className="w-full py-3">
              <div className="flex flex-col gap-4 px-4 py-4 pt-3">
                {section.categoryName === '필수 확인' ? (
                  section.items.length === 0 ? (
                    <div className="flex w-full justify-center">
                      <TitleXs className="text-neutral-70">아직 필수 확인 항목이 없습니다</TitleXs>
                    </div>
                  ) : (
                    section.items.map((item) => (
                      <React.Fragment key={item.id}>
                        <CheckListBoxFavoriteItem
                          question={item.question}
                          description={item.description}
                        />
                        {item.id !== section.items[section.items.length - 1].id && (
                          <CheckListBoxSeparator />
                        )}
                      </React.Fragment>
                    ))
                  )
                ) : (
                  section.items.map((item) => (
                    <React.Fragment key={item.id}>
                      <CheckListBoxItem question={item.question} description={item.description} />
                      {item.id !== section.items[section.items.length - 1].id && (
                        <CheckListBoxSeparator />
                      )}
                    </React.Fragment>
                  ))
                )}
              </div>
            </CheckListBox>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
