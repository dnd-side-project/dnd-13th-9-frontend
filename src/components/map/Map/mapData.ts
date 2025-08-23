// ====== Types ======
export type ApiEnvelope<T> = { code: '20000'; message: '성공했습니다'; data: T };

export type PlanSummary = {
  planId: number;
  name: string;
  createdAt: string;
  folderCount: number;
  isDefaultPlan: boolean;
};

export type FolderSummary = {
  folderId: number;
  name: string;
  createdAt: string;
  recordCount: number;
  isDefaultFolder: boolean;
};

export type PropertySummary = {
  propertyId: number;
  planId: number;
  planName: string;
  folderId: number;
  folderName: string;
  propertyName: string;
  feeling: 'GOOD' | 'SOSO' | 'BAD';
  contractType: 'MONTHLY_RENT' | 'JEONSE' | 'SALE';
  houseType: 'APT' | 'OFFICETEL' | 'VILLA' | 'ETC';
  depositBig?: number;
  depositSmall?: number;
  managementFee?: number;
  address: string;
  latitude: number;
  longitude: number;
  thumbnailUrl?: string;
  updatedAt: string;
};

export type PropertyDetail = {
  images: { imageId: number; url: string; order: number }[];
  propertyId: number;
  planId: number;
  planName: string;
  folderId: number;
  folderName: string;
  feeling: 'GOOD' | 'SOSO' | 'BAD';
  propertyName: string;
  memo?: string;
  referenceUrl?: string;
  address: string;
  detailAddress?: string;
  longitude: number;
  latitude: number;
  contractType: 'MONTHLY_RENT' | 'JEONSE' | 'SALE';
  houseType: 'APT' | 'OFFICETEL' | 'VILLA' | 'ETC';
  depositBig?: number;
  depositSmall?: number;
  managementFee?: number;
  moveInInfo?: string;
  checklist: {
    categories: { order: number; name: string }[];
    sections: {
      categoryId: number;
      categoryName: string;
      memo?: string;
      items: { id: number; question: string; description?: string }[];
    }[];
  };
};

// ====== Seed (from your mock categories) ======
export const categories = ['계획', '학교', '직장', '기타'] as const;
export type Category = (typeof categories)[number];

// ====== In-memory DB ======
// Plans: 기본 계획 + categories.계획 항목
const now = new Date().toISOString();

const plans: PlanSummary[] = [
  {
    planId: 1,
    name: '기본 계획',
    createdAt: '2025-08-12T21:50:44.801487',
    folderCount: 4,
    isDefaultPlan: true,
  },
  {
    planId: 2,
    name: '복학',
    createdAt: '2025-08-12T21:50:44.801487',
    folderCount: 2,
    isDefaultPlan: false,
  },
  {
    planId: 3,
    name: '판교 인턴 단기로',
    createdAt: '2025-08-12T21:50:44.801487',
    folderCount: 2,
    isDefaultPlan: false,
  },
  {
    planId: 4,
    name: '수원 캠퍼스 근처 스 근처',
    createdAt: '2025-08-12T21:50:44.801487',
    folderCount: 2,
    isDefaultPlan: false,
  },
];

// Folders by plan
const foldersByPlan: Record<number, FolderSummary[]> = {
  // 기본 계획 (샘플: 스샷과 유사한 이름)
  1: [
    {
      folderId: 101,
      name: '혜화동',
      createdAt: '2025-08-12T21:50:44.801487',
      recordCount: 5,
      isDefaultFolder: true,
    },
    {
      folderId: 102,
      name: '수유동 1',
      createdAt: '2025-08-12T21:50:44.801487',
      recordCount: 1,
      isDefaultFolder: false,
    },
    {
      folderId: 103,
      name: '수유동 2',
      createdAt: '2025-08-12T21:50:44.801487',
      recordCount: 2,
      isDefaultFolder: false,
    },
    {
      folderId: 104,
      name: '기본 폴더',
      createdAt: '2025-08-12T21:50:44.801487',
      recordCount: 2,
      isDefaultFolder: false,
    },
  ],
  // 나머지 계획들은 간단히 2개 폴더씩
  2: [
    {
      folderId: 201,
      name: '캠퍼스 A',
      createdAt: '2025-08-12T21:50:44.801487',
      recordCount: 2,
      isDefaultFolder: true,
    },
    {
      folderId: 202,
      name: '캠퍼스 B',
      createdAt: '2025-08-12T21:50:44.801487',
      recordCount: 1,
      isDefaultFolder: false,
    },
  ],
  3: [
    {
      folderId: 301,
      name: '역세권',
      createdAt: '2025-08-12T21:50:44.801487',
      recordCount: 1,
      isDefaultFolder: true,
    },
    {
      folderId: 302,
      name: '조용한 동네',
      createdAt: '2025-08-12T21:50:44.801487',
      recordCount: 2,
      isDefaultFolder: false,
    },
  ],
  4: [
    {
      folderId: 401,
      name: '학교 근처',
      createdAt: '2025-08-12T21:50:44.801487',
      recordCount: 2,
      isDefaultFolder: true,
    },
    {
      folderId: 402,
      name: '버스 환승 편한 곳',
      createdAt: now,
      recordCount: 2,
      isDefaultFolder: false,
    },
  ],
};

const baseCoord = { lat: 37.582, lng: 127.001 }; // 혜화/대학로 대략

const makeProp = (
  id: number,
  planId: number,
  planName: string,
  folderId: number,
  folderName: string,
  name: string,
  offset: [number, number],
  feeling: PropertySummary['feeling'] = 'GOOD'
): PropertySummary => ({
  propertyId: id,
  planId,
  planName,
  folderId,
  folderName,
  propertyName: name,
  feeling,
  contractType: 'MONTHLY_RENT',
  houseType: 'ETC',
  depositBig: 10,
  depositSmall: 0,
  managementFee: 5,
  address: '서울특별시 종로구 혜화동',
  latitude: baseCoord.lat + offset[0],
  longitude: baseCoord.lng + offset[1],
  thumbnailUrl:
    'https://zipzip-bucket.s3.amazonaws.com/images/1ced2238-b5ce-41c8-bea4-db7794b9198f.png',
  updatedAt: now,
});

const propsByFolder: Record<number, PropertySummary[]> = {
  101: [
    makeProp(1001, 1, '기본 계획', 101, '혜화동', '후문 옆빌 앞 집', [0.001, 0.001]),
    makeProp(1002, 1, '기본 계획', 101, '혜화동', '지하철역 근처', [0.0002, 0.0015], 'SOSO'),
    makeProp(1003, 1, '기본 계획', 101, '혜화동', '마로니에 공원 근처', [-0.0006, 0.0007], 'GOOD'),
    makeProp(1004, 1, '기본 계획', 101, '혜화동', '셔틀 정류장', [-0.0009, -0.0004], 'GOOD'),
    makeProp(1005, 1, '기본 계획', 101, '혜화동', '서울대 병원 쪽', [0.0011, -0.0003], 'BAD'),
  ],
  102: [makeProp(1101, 1, '기본 계획', 102, '수유동 1', '초역세권 원룸', [0.001, -0.001])],
  103: [
    makeProp(1201, 1, '기본 계획', 103, '수유동 2', '채광 좋은 집', [-0.001, 0.0]),
    makeProp(1202, 1, '기본 계획', 103, '수유동 2', '골목 안쪽 조용한 집', [0.0, -0.001]),
  ],
  104: new Array(6)
    .fill(0)
    .map((_, i) =>
      makeProp(1301 + i, 1, '기본 계획', 104, '기본 폴더', `기본 매물 ${i + 1}`, [i * 0.0002, 0])
    ),
  // 다른 계획의 폴더는 간단히 0~2개만
  201: [makeProp(2001, 2, '복학', 201, '캠퍼스 A', '기숙사 후문', [0.001, 0.0002])],
  301: [makeProp(3001, 3, '판교 인턴 단기로', 301, '역세권', '역 앞 빌라', [0.0005, -0.0005])],
};

// Detail DB: 요약과 id만 맞춰 주고, 상세는 동일 스키마
const detailById: Record<number, PropertyDetail> = {};
Object.values(propsByFolder)
  .flat()
  .forEach((p, idx) => {
    detailById[p.propertyId] = {
      images: [{ imageId: idx + 1, url: p.thumbnailUrl!, order: 1 }],
      propertyId: p.propertyId,
      planId: p.planId,
      planName: p.planName,
      folderId: p.folderId,
      folderName: p.folderName,
      feeling: p.feeling,
      propertyName: p.propertyName,
      memo: '제일 우선 순위',
      referenceUrl: 'https://naver.me/Gub7uDq5',
      address: p.address,
      detailAddress: '105층',
      longitude: p.longitude,
      latitude: p.latitude,
      contractType: p.contractType,
      houseType: p.houseType,
      depositBig: 7,
      depositSmall: 10,
      managementFee: 10,
      moveInInfo: '9월초',
      checklist: {
        categories: [
          { order: 0, name: '필수 확인' },
          { order: 1, name: '메인 공간' },
          { order: 2, name: '창문' },
          { order: 3, name: '욕실' },
          { order: 4, name: '건물' },
        ],
        sections: [
          {
            categoryId: 0,
            categoryName: '필수 확인',
            memo: '필수 확인 메모 입니다!!',
            items: [
              {
                id: 2,
                question: '전체적으로 깔끔한 편인가요?',
                description: '벽지/장판 오염 시 도배 문의',
              },
              { id: 4, question: '벌레 출몰 위험은 없나요?', description: '약 흔적/까만 점 확인' },
              { id: 8, question: '바람이 잘 통하나요?' },
              { id: 13, question: '수압이 좋은 집인가요?', description: '변기 물 내리며 확인' },
              { id: 23, question: '보안 상태는 괜찮은가요?', description: '도어락/방범창/CCTV' },
              { id: 21, question: '악취 위험 가게가 있나요?' },
            ],
          },
          {
            categoryId: 4,
            categoryName: '메인 공간',
            items: [
              { id: 1, question: '너무 노후화되진 않았나요?' },
              { id: 3, question: '체감 면적은 넓은가요?' },
              { id: 5, question: '벽간 소음은 괜찮은가요?', description: "'통통' 소리 나면 주의" },
              { id: 6, question: '가구 옵션 상태는?' },
              { id: 7, question: '인터넷/휴대폰 수신은?' },
            ],
          },
          {
            categoryId: 1,
            categoryName: '창문',
            memo: '메인 공간 메모입니다',
            items: [
              { id: 9, question: '햇빛이 잘 드나요?', description: '남향 > 남동향 > 동향 ...' },
              { id: 10, question: '뷰는 괜찮은가요?', description: '인접 건물 거리 확인' },
            ],
          },
          {
            categoryId: 2,
            categoryName: '욕실',
            items: [
              { id: 11, question: '배수구 악취는 없나요?', description: '환풍기/창문' },
              { id: 12, question: '온수가 잘 나오나요?', description: '보일러 연식 10년↑ 주의' },
              { id: 14, question: '배수 상태는 괜찮은가요?', description: '물 받아두고 빼보기' },
            ],
          },
          {
            categoryId: 3,
            categoryName: '건물',
            memo: '욕실 공간 메모입니다',
            items: [
              { id: 15, question: '층수는 어떻게 되나요?' },
              { id: 16, question: '엘리베이터는 있나요?' },
              { id: 22, question: '소음 발생 가능성은?', description: '대로변/공사장 여부' },
              { id: 17, question: '악취(담배/찌든 냄새)는?' },
              { id: 18, question: '주차 공간은 있나요?' },
              { id: 19, question: '가파른 언덕에 있나요?' },
              { id: 20, question: '편의시설이 잘 갖춰져 있나요?', description: '편의점/빨래방 등' },
            ],
          },
        ],
      },
    };
  });

// ====== Simple mock API ======
export function getPlans(): PlanSummary[] {
  return plans;
}

export function getFolders(planId: number): FolderSummary[] {
  return foldersByPlan[planId] ?? [];
}

export function getPropertiesByFolder(folderId: number): PropertySummary[] {
  return propsByFolder[folderId] ?? [];
}

export function getPropertyDetail(propertyId: number): PropertyDetail | undefined {
  return detailById[propertyId];
}
