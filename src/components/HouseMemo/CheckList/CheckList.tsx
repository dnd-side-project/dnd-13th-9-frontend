'use client';
import React from 'react';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/Tabs';
import { Dropdown, DropdownContent } from '@/components/ui/Dropdown';

// 예시 데이터
const checkListData = {
  categories: [
    { order: 0, name: '필수 확인' },
    { order: 1, name: '메인 공간' },
    { order: 2, name: '창문' },
    { order: 3, name: '욕실' },
    { order: 4, name: '건물' },
  ],
  sections: [
    {
      categoryName: '필수 확인',
      items: [
        {
          id: 2,
          question: '전체적으로 깔끔한 편인가요?',
          description: '벽지와 장판 오염이 많을 경우 도배 가능한지 문의하세요',
        },
        { id: 3, question: '체감 면적은 넓은가요?' },
        {
          id: 4,
          question: '벌레 출몰 위험은 없나요?',
          description: '주방에 까만 점이 있거나, 약을 둔 흔적이 있나요?',
        },
        { id: 8, question: '바람이 잘 통하나요?' },
        {
          id: 13,
          question: '수압이 좋은 집인가요?',
          description: '세면대, 샤워기를 틀어 놓고 변기 물을 내려보세요',
        },
        {
          id: 23,
          question: '보안 상태는 괜찮은가요?',
          description: '도어락·방범창 상태와 CCTV 위치를 확인하세요',
        },
        { id: 21, question: '건물에 악취나 벌레가 있을만한 가게가 있나요?' },
      ],
    },
    {
      categoryName: '메인 공간',
      items: [
        { id: 1, question: '너무 노후화되진 않았나요?' },
        {
          id: 5,
          question: '벽간 소음은 괜찮은가요?',
          description: "벽을 두드렸을 때, '통통' 소리가 난다면 주의하세요",
        },
        {
          id: 6,
          question: '가구 옵션 구성과 상태는 어떤가요?',
          description: '수리나 청소가 필요한지 꼼꼼하게 살펴보세요',
        },
        {
          id: 7,
          question: '인터넷이 설치되어 있나요?',
          description: '휴대폰도 잘 터지는지 확인하세요',
        },
      ],
    },
  ],
};

export default function CheckList() {
  return (
    <div>
      <Tabs defaultValue="필수 확인">
        <TabsList className="overflow-scroll py-3">
          {checkListData.categories.map((category) => (
            <TabsTrigger.Chip key={category.order} value={category.name} text={category.name} />
          ))}
        </TabsList>

        {checkListData.sections.map((section) => (
          <TabsContent key={section.categoryName} value={section.categoryName}>
            <Dropdown defaultOpen={true}>
              <Dropdown.Trigger title={section.categoryName} className="min-w-[350px]" />
              <DropdownContent className="flex max-w-[350px] flex-col gap-4 px-4 py-4 pt-3">
                {section.categoryName === '필수 확인'
                  ? section.items.map((item) => (
                      <Dropdown.FavoriteItem
                        key={item.id}
                        question={item.question}
                        description={item.description}
                        onClick={() => alert('즐겨찾기 클릭!')}
                      />
                    ))
                  : section.items.map((item) => (
                      <Dropdown.BaseItem
                        key={item.id}
                        question={item.question}
                        description={item.description}
                      />
                    ))}
              </DropdownContent>
            </Dropdown>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
