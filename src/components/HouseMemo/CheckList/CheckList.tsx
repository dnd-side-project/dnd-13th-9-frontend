'use client';
import React, { Suspense } from 'react';
import { useCheckList } from './useCheckList';
import CheckListTabs from './CheckListTabs';
//todo : 로딩 컴포넌트

function CheckListContent() {
  const { categories, sections, getSectionItems, isLastItem, hasRequiredItems } = useCheckList();

  return (
    <CheckListTabs
      categories={categories}
      sections={sections}
      getSectionItems={getSectionItems}
      isLastItem={isLastItem}
      hasRequiredItems={hasRequiredItems}
    />
  );
}

export default function CheckList() {
  return (
    <div className="bg-coolGray-20 h-fit min-h-120 px-6 py-1 pb-4">
      <Suspense
        fallback={
          <div className="flex h-32 items-center justify-center">
            <span>로딩 중...</span>
          </div>
        }
      >
        <CheckListContent />
      </Suspense>
    </div>
  );
}
