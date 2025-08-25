export const checkListData = {
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
      items: [],
    },
    {
      categoryName: '메인 공간',
      items: [
        { id: 1, question: '너무 노후화되진 않았나요?', isFill: false },
        {
          id: 2,
          question: '전체적으로 깔끔한 편인가요?',
          description: '벽지와 장판 오염이 많을 경우 도배 가능한지 문의하세요',
          isFill: false,
        },
        { id: 3, question: '체감 면적은 넓은가요?', isFill: false },
        {
          id: 4,
          question: '벌레 출몰 위험은 없나요?',
          description: '주방에 까만 점이 있거나, 약을 둔 흔적이 있나요?',
          isFill: false,
        },
        {
          id: 5,
          question: '벽간 소음은 괜찮은가요?',
          description: "벽을 두드렸을 때, '통통' 소리가 난다면 주의하세요",
          isFill: false,
        },
        {
          id: 6,
          question: '가구 옵션 구성과 상태는 어떤가요?',
          description: '수리나 청소가 필요한지 꼼꼼하게 살펴보세요',
          isFill: false,
        },
        {
          id: 7,
          question: '인터넷이 설치되어 있나요?',
          description: '휴대폰도 잘 터지는지 확인하세요',
          isFill: false,
        },
      ],
    },
    {
      categoryName: '창문',
      items: [
        { id: 8, question: '바람이 잘 통하나요?', isFill: false },
        { id: 9, question: '햇빛이 잘 드나요?', isFill: false },
        {
          id: 10,
          question: '뷰는 괜찮은가요?',
          description: '다른 건물과 너무 가깝지는 않은지 확인하세요',
          isFill: false,
        },
      ],
    },
    {
      categoryName: '욕실',
      items: [
        {
          id: 11,
          question: '배수구 악취는 없나요?',
          description: '화장실 환풍기와 창문 여부를 확인하세요',
          isFill: false,
        },
        {
          id: 12,
          question: '온수가 잘 나오나요?',
          description: '보일러 연식이 10년 이상이면 온수/수압 테스트 해주세요',
          isFill: false,
        },
        {
          id: 13,
          question: '수압이 좋은 집인가요?',
          description: '세면대, 샤워기를 틀어 보고 변기 물을 내려보세요',
          isFill: false,
        },
        {
          id: 14,
          question: '배수 상태는 괜찮은가요?',
          description: '물 받아두고 다시 내려보세요',
          isFill: false,
        },
      ],
    },
    {
      categoryName: '건물',
      items: [
        { id: 15, question: '층수는 어떻게 되나요?', isFill: false },
        { id: 16, question: '엘리베이터는 있나요?', isFill: false },
        {
          id: 17,
          question: '소음 발생 가능성은 없나요?',
          description: '대로변에 위치하거나 인근에 공사장이 있나요?',
          isFill: false,
        },
        {
          id: 18,
          question: '보안 상태는 괜찮은가요?',
          description: '도어락/방범창 상태와 CCTV 위치를 확인하세요',
          isFill: false,
        },
        { id: 19, question: '담배나 찌든 냄새 등 악취가 있진 않나요?', isFill: false },
        { id: 20, question: '주차 공간이 있나요?', isFill: false },
        { id: 21, question: '가까운 연대에 있지는 않나요?', isFill: false },
        {
          id: 22,
          question: '인근에 편의시설이 잘 갖춰져 있나요?',
          description: '편의점, 코인빨래방 등이 가까운 곳에 있나요?',
          isFill: false,
        },
        { id: 23, question: '건물에 악취나 벌레가 있을만한 가게가 있나요?', isFill: false },
      ],
    },
  ],
};
