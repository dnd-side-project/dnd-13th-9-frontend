'use client';
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import BaseInfo from '@/components/HouseMemo/BaseInfo/BaseInfo';
import { AddImgButtonGroup } from '@/components/HouseMemo/AddImgGroup';
import { HouseMemoContext, initialHouseMemo } from '@/contexts/HouseMemoContext';
import CheckList from '@/components/HouseMemo/CheckList/CheckList';

export default function page() {
  const [houseMemo, setHouseMemo] = useState(initialHouseMemo);

  return (
    <MainLayout>
      <HouseMemoContext.Provider value={{ houseMemo, setHouseMemo }}>
        <AddImgButtonGroup />
        <Tabs defaultValue="baseInfo">
          <div className="px-6">
            <TabsList>
              <TabsTrigger.Bar value="baseInfo">기본 정보</TabsTrigger.Bar>
              <TabsTrigger.Bar value="checkList">체크 리스트</TabsTrigger.Bar>
            </TabsList>
          </div>

          <TabsContent value="baseInfo">
            <BaseInfo />
          </TabsContent>
          <TabsContent value="checkList">
            <CheckList />
          </TabsContent>
        </Tabs>
      </HouseMemoContext.Provider>
    </MainLayout>
  );
}
