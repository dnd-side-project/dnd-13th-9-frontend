'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { MainLayout } from '@/components/layout';
import { Header } from '@/components/ui/Header';
import { Icon } from '@/components/ui/Icon';
import {
  TitleS,
  BodyM,
  BodyS,
  BodyL,
  TitleXl,
  BodyXs,
  Title2xl,
  TitleL,
} from '@/components/ui/Typography';
import type { ChecklistSection } from '@/types/house-memo';
import { useHouseMemoInfoById } from '@/queries/houseMemo/useHouseMemoInfoById';
import { Chip } from '@/components/ui/Chip';
import { getContractLabel, getHouseTypeLabel } from '@/utils/labels';
import { KakaoMap } from '@/components/HouseMemo/BaseInfo/Map';
import { AddImgButtonGroup } from '@/components/HouseMemo/AddImgGroup/AddImgButtonGroup';

function feelingToText(feeling: string): string {
  const feelingMap: Record<string, string> = {
    GOOD: '좋음',
    SOSO: '그저 그래요',
    BAD: '별로에요',
  };
  return feelingMap[feeling] || feeling;
}

//TODO :: suspense 적용 , 컴포넌트화
export default function Page() {
  const params = useParams();
  const id = params.id as string;
  const { data, isLoading, error } = useHouseMemoInfoById(id);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex h-screen items-center justify-center"></div>
      </MainLayout>
    );
  }

  if (error || !data?.data) {
    return (
      <MainLayout>
        <div className="flex h-screen items-center justify-center"></div>
      </MainLayout>
    );
  }

  const houseMemo = data.data;

  return (
    <MainLayout>
      <Header
        left={
          <Icon
            name="arrowLeft"
            color="black"
            className="cursor-pointer"
            size={24}
            padding={10}
            onClick={() => window.history.back()}
          />
        }
        title={houseMemo.propertyName}
        right={
          <div className="flex gap-2 px-2">
            <Icon name="share" color="black" size={20} />
            <Icon name="edit" color="black" size={20} />
          </div>
        }
      />

      <div className="flex flex-col gap-6 px-6 py-4">
        <AddImgButtonGroup images={houseMemo.images} readonly={true} />

        {/* 태그 섹션 */}
        <div className="flex flex-wrap gap-2">
          <Chip
            iconName="folder"
            variant="primary"
            size="sm"
            text={`${houseMemo.folderName} > ${houseMemo.planName}`}
          />

          <Chip
            iconName="angryFill"
            variant="secondary"
            size="sm"
            text={feelingToText(houseMemo.feeling)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Title2xl className="text-xl font-bold">{houseMemo.propertyName}</Title2xl>
          {houseMemo.depositBig && (
            <div className="flex items-center gap-2">
              <TitleXl className="text-primary-50">
                {getContractLabel(houseMemo.contractType)} {houseMemo.depositBig}억{' '}
                {houseMemo.depositSmall}만원
              </TitleXl>
              <BodyS className="text-neutral-60">(보증금/월세)</BodyS>
            </div>
          )}

          {/* 기본 매물 정보 */}
          <div className="text-neutral-80 flex items-center gap-2">
            <BodyM>{getHouseTypeLabel(houseMemo.houseType)}</BodyM>
            {houseMemo.managementFee && (
              <>
                <span>|</span>
                <BodyM>관리비 {houseMemo.managementFee}만원</BodyM>
              </>
            )}
            {houseMemo.moveInInfo && (
              <>
                <span>|</span>
                <BodyM>{houseMemo.moveInInfo}</BodyM>
              </>
            )}
          </div>
        </div>

        {/* 메모 */}
        {houseMemo.memo && (
          <>
            <hr className="border-neutral-40" />
            <div>
              <BodyM className="text-neutral-60 mb-2">메모</BodyM>
              <BodyL className="leading-relaxed text-neutral-100">{houseMemo.memo}</BodyL>
            </div>
          </>
        )}

        {/* 주소 */}
        <div>
          <BodyM className="text-neutral-60 mb-2">주소</BodyM>
          <div className="flex items-center justify-between">
            <div>
              <BodyL className="mb-1 text-neutral-100">{houseMemo.address}</BodyL>
              {houseMemo.detailAddress && <BodyS>{houseMemo.detailAddress}</BodyS>}
            </div>

            <button
              className="text-neutral-60 flex items-center gap-0.5 px-3 py-1 text-sm"
              onClick={() => navigator.clipboard.writeText(houseMemo.address)}
            >
              <Icon name="copy" width={14} />
              <BodyXs>복사</BodyXs>
            </button>
          </div>
        </div>

        {/* 지도 */}
        <div>
          {houseMemo.longitude && houseMemo.latitude ? (
            <div className="h-48 w-full overflow-hidden rounded-lg">
              <KakaoMap
                type="NEARBY"
                height="150px"
                lat={houseMemo.latitude}
                lng={houseMemo.longitude}
              />
            </div>
          ) : (
            <div className="bg-neutral-10 flex h-48 w-full items-center justify-center rounded-lg">
              <BodyM className="text-neutral-60">위치 정보가 없습니다</BodyM>
            </div>
          )}
        </div>

        {/* 참고 링크 */}
        {houseMemo.referenceUrl && (
          <div>
            <TitleS className="mb-2">참고 링크</TitleS>
            <BodyM className="text-primary-50 break-all">{houseMemo.referenceUrl}</BodyM>
          </div>
        )}

        {/* 체크 리스트 */}
        <div>
          <hr className="border-neutral-40 pb-4" />
          <TitleL className="bg-white py-2">체크리스트</TitleL>

          {houseMemo.checklist.sections
            .filter((section: ChecklistSection) => section.memo)
            .map((section: ChecklistSection) => (
              <div
                key={section.categoryId}
                className="border-neutral-20 mb-4 rounded-lg border bg-white p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="mb-2 flex gap-1">
                      <Icon name="checkList" />
                      <TitleS>{section.categoryName}</TitleS>
                    </div>
                    <BodyM className="text-neutral-80 leading-relaxed">{section.memo}</BodyM>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </MainLayout>
  );
}
