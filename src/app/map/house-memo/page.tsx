import React from 'react';
import { MainLayout } from '@/components/layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { LabelContainer } from '@/components/house-memo/LabelContainer';

export default function page() {
  return (
    <MainLayout className="px-6">
      <Tabs defaultValue="baseInfo">
        <TabsList>
          <TabsTrigger value="baseInfo">기본 정보</TabsTrigger>
          <TabsTrigger value="checkList">체크 리스트</TabsTrigger>
        </TabsList>

        <TabsContent value="baseInfo">
          //chap1
          <LabelContainer label="전반적인 느낌"></LabelContainer>
          <LabelContainer label="매물명" required={true}></LabelContainer>
          <LabelContainer label="메모"></LabelContainer>
          <LabelContainer label="참고 링크"></LabelContainer>
          //chap2
          <LabelContainer label="주소" required={true}></LabelContainer>
          <LabelContainer label="상세 주소"></LabelContainer>
          <LabelContainer label="계약 형태" required={true}></LabelContainer>
          <LabelContainer label="집 유형"></LabelContainer>
          //chap3
          <LabelContainer label="보증금" required={true}></LabelContainer>
          <LabelContainer label="월세" required={true}></LabelContainer>
          <LabelContainer label="관리비"></LabelContainer>
          <LabelContainer label="입주 가능 시기"></LabelContainer>
        </TabsContent>
        <TabsContent value="checkList">content2</TabsContent>
      </Tabs>
    </MainLayout>
  );
}
