'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import { MainLayout } from '@/components/layout';
import { Header } from '@/components/ui/Header';
import { Icon } from '@/components/ui/Icon';
import { BodyM, BodyL, Title2xl, BodyXs } from '@/components/ui/Typography';
import { useNearbyMemoInfoById } from '@/queries/nearbyMemo/useNearbyMemoInfoById';
import { KakaoMap } from '@/components/HouseMemo/BaseInfo/Map';
import { AddImgButtonGroup } from '@/components/HouseMemo/AddImgGroup/AddImgButtonGroup';
import Loading from '@/app/loading';

export default function Page() {
  const params = useParams();
  const id = params.id as string;
  const { data, isLoading, error } = useNearbyMemoInfoById(id);
  //TODO :: suspense 적용 , 컴포넌트화

  if (error || !data?.data || isLoading) {
    return (
      <MainLayout>
        <Loading />
      </MainLayout>
    );
  }

  const memo = data.data;

  return (
    <MainLayout>
      <Header
        left={
          <Icon
            name="arrowLeft"
            color="black"
            className="cursor-pointer"
            size={22}
            onClick={() => window.history.back()}
          />
        }
        title={memo.title}
        right={
          <div className="flex gap-2 px-2">
            <Icon name="share" color="black" size={20} />
            <Icon name="edit" color="black" size={20} />
          </div>
        }
      />

      <div className="flex flex-col gap-6 px-6 py-4">
        {/* 이미지 */}
        <AddImgButtonGroup
          images={memo.imageUrls.map((url, index) => ({ url, order: index + 1 }))}
          readonly={true}
        />

        {/* 메모 제목 */}
        <Title2xl className="text-xl font-bold">{memo.title}</Title2xl>

        {/* 설명 */}
        {memo.description && (
          <>
            <hr className="border-neutral-40" />
            <div>
              <BodyM className="text-neutral-60 mb-2">메모</BodyM>
              <BodyL className="leading-relaxed text-neutral-100">{memo.description}</BodyL>
            </div>
          </>
        )}

        {/* 주소 */}
        <div>
          <BodyM className="text-neutral-60 mb-2">주소</BodyM>
          <div className="flex items-center justify-between">
            <div>
              <BodyL className="mb-1 text-neutral-100">{memo.address}</BodyL>
            </div>
            <button
              className="text-neutral-60 flex items-center gap-0.5 px-3 py-1 text-sm"
              onClick={() => navigator.clipboard.writeText(memo.address)}
            >
              <Icon name="copy" width={14} />
              <BodyXs>복사</BodyXs>
            </button>
          </div>
        </div>

        {/* 지도 */}
        <div>
          {memo.longitude && memo.latitude ? (
            <div className="h-48 w-full overflow-hidden rounded-lg">
              <KakaoMap
                height="150px"
                type="NEARBY"
                lat={parseFloat(String(memo.latitude))}
                lng={parseFloat(String(memo.longitude))}
              />
            </div>
          ) : (
            <div className="bg-neutral-10 flex h-48 w-full items-center justify-center rounded-lg">
              <BodyM className="text-neutral-60">위치 정보가 없습니다</BodyM>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
