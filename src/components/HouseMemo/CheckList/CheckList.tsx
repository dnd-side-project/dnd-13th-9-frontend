'use client';
import React, { Suspense } from 'react';
import { useCheckList } from './useCheckList';
import CheckListTabs from './CheckListTabs';
import Loading from '@/app/loading';
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
    <div className="bg-coolGray-20 flex flex-col px-6 py-1 pb-4">
      <div className="flex-1">
        <Suspense fallback={<Loading />}>
          <CheckListContent />
        </Suspense>
      </div>
    </div>
  );
}
