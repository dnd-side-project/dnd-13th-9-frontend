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
  folderId: number;
  memoType?: 'PROPERTY' | 'NEARBY';
  nearTag?: 'GOOD' | 'BAD' | 'CONVENIENCE' | 'TRAFFIC' | 'SECURITY' | 'NOISE';
  feeling: 'GOOD' | 'SOSO' | 'BAD';
  propertyName: string;
  memo: string;
  referenceUrl: string;
  address: string;
  detailAddress: string;
  longitude: number;
  latitude: number;
  contractType: 'MONTHLY_RENT' | 'JEONSE' | 'PURCHASE';
  houseType: 'APT' | 'OFFICETEL' | 'VILLA' | 'ETC';
  depositBig: number;
  depositSmall: number;
  managementFee: number;
  moveInInfo: string;
  categoryMemoList: { categoryId: number; memo: string }[];
  images: { imageId: number; url: string; order: number }[];
};

// ====== In-memory DB ======
// Plans: 계획 목록
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
    name: '수원 캠퍼스 근처',
    createdAt: '2025-08-12T21:50:44.801487',
    folderCount: 2,
    isDefaultPlan: false,
  },
];

// Folder: 폴더 목록
const foldersByPlan: Record<number, FolderSummary[]> = {
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
      recordCount: 5,
      isDefaultFolder: false,
    },
    {
      folderId: 104,
      name: '기본 폴더',
      createdAt: '2025-08-12T21:50:44.801487',
      recordCount: 2,
      isDefaultFolder: false,
    },
    {
      folderId: 105,
      name: '후문 옆빌 앞 집',
      createdAt: '2025-08-12T21:50:44.801487',
      recordCount: 2,
      isDefaultFolder: false,
    },
    {
      folderId: 106,
      name: '아무 폴더',
      createdAt: '2025-08-12T21:50:44.801487',
      recordCount: 0,
      isDefaultFolder: false,
    },
  ],
  2: [
    {
      folderId: 201,
      name: '캠퍼스 A',
      createdAt: '2025-08-12T21:50:44.801487',
      recordCount: 1,
      isDefaultFolder: true,
    },
    {
      folderId: 202,
      name: '캠퍼스 B',
      createdAt: '2025-08-12T21:50:44.801487',
      recordCount: 0,
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
      recordCount: 0,
      isDefaultFolder: false,
    },
  ],
  4: [
    {
      folderId: 401,
      name: '학교 근처',
      createdAt: '2025-08-12T21:50:44.801487',
      recordCount: 1,
      isDefaultFolder: true,
    },
    {
      folderId: 402,
      name: '버스 환승 편한 곳',
      createdAt: now,
      recordCount: 0,
      isDefaultFolder: false,
    },
  ],
};

const baseCoord = { lat: 37.582, lng: 127.001 }; // 혜화/대학로 대략

// ====== Helpers: deposit/memo generation ======
function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateDeposit(): { big: number; small: number } {
  // big: 0~1000 억, small: 0~9999 만원
  return { big: randInt(0, 1000), small: randInt(0, 9999) };
}

function contractLabel(ct: PropertySummary['contractType']): string {
  return ct === 'MONTHLY_RENT' ? '월세' : ct === 'JEONSE' ? '전세' : '매매';
}

type MakePropArgs = Omit<PropertySummary, 'images'> & { images?: PropertySummary['images'] };

const makeProp = (arg: MakePropArgs): PropertySummary => {
  return {
    ...arg,
    images: arg.images ?? [
      {
        imageId: 1,
        url: 'https://zipzip-bucket.s3.amazonaws.com/images/1ced2238-b5ce-41c8-bea4-db7794b9198f.png',
        order: 1,
      },
    ],
  };
};

const propsByFolder: Record<number, PropertySummary[]> = {
  101: [
    makeProp({
      propertyId: 1001,
      planId: 1,
      folderId: 101,
      memoType: 'NEARBY',
      feeling: 'GOOD',
      propertyName: '후문 옆빌 앞 집',
      memo: '금액 조건은 괜찮은데, 통학이 불편할것 같음. 주변 편의 시설은 많고 편의점 5분거리에 있어서 좋ㅇ 금액 조건은 괜찮은데, 통학이 불편할것 같음. 주변 편의 시설은 많고 편의점 5분거리에 있어서 좋ㅇ',
      referenceUrl: 'https://naver.me/Gub7uDq5',
      address: '서울특별시 종로구 혜화동',
      detailAddress: '105층',
      longitude: baseCoord.lng + 0.001,
      latitude: baseCoord.lat + 0.001,
      contractType: 'JEONSE',
      houseType: 'ETC',
      depositBig: 1,
      depositSmall: 5000,
      managementFee: 10,
      moveInInfo: '9월초',
      categoryMemoList: [
        { categoryId: 0, memo: '필수 확인 메모 입니다!!' },
        { categoryId: 1, memo: '메인 공간 메모입니다' },
        { categoryId: 3, memo: '욕실 공간 메모입니다' },
      ],
    }),
    makeProp({
      propertyId: 1002,
      planId: 1,
      folderId: 101,
      feeling: 'SOSO',
      propertyName: '지하철역 근처',
      memo: '역세권 메모',
      referenceUrl: 'https://naver.me/Gub7uDq5',
      address: '서울특별시 종로구 혜화동',
      detailAddress: '105층',
      longitude: baseCoord.lng + 0.0015,
      latitude: baseCoord.lat + 0.0002,
      contractType: 'MONTHLY_RENT',
      houseType: 'ETC',
      depositBig: 0,
      depositSmall: 1000,
      managementFee: 70,
      moveInInfo: '9월초',
      categoryMemoList: [
        { categoryId: 0, memo: '필수 확인 메모 입니다!!' },
        { categoryId: 1, memo: '메인 공간 메모입니다' },
        { categoryId: 3, memo: '욕실 공간 메모입니다' },
      ],
    }),
  ],
  102: [
    makeProp({
      propertyId: 1101,
      planId: 1,
      folderId: 102,
      feeling: 'GOOD',
      propertyName: '초역세권 원룸',
      memo: '메모 입니다',
      referenceUrl: 'https://naver.me/Gub7uDq5',
      address: '서울특별시 종로구 혜화동',
      detailAddress: '105층',
      longitude: baseCoord.lng - 0.001,
      latitude: baseCoord.lat + 0.001,
      contractType: 'PURCHASE',
      houseType: 'ETC',
      depositBig: 2,
      depositSmall: 5000,
      managementFee: 10,
      moveInInfo: '9월초',
      categoryMemoList: [
        { categoryId: 0, memo: '필수 확인 메모 입니다!!' },
        { categoryId: 1, memo: '메인 공간 메모입니다' },
        { categoryId: 3, memo: '욕실 공간 메모입니다' },
      ],
    }),
  ],
  103: [
    makeProp({
      propertyId: 1201,
      planId: 1,
      folderId: 103,
      memoType: 'NEARBY',
      nearTag: 'CONVENIENCE',
      feeling: 'GOOD',
      propertyName: '셔틀 정류장',
      memo: '셔틀버스 타면 중앙도서관까지 10분 안에 간다. 친구 피셜 수업 직전에는 버거킹까지 줄이 길게 서 있다고 한다. 미리 가서 타야지 지각 안 할듯',
      referenceUrl: 'https://naver.me/Gub7uDq5',
      address: '서울특별시 종로구 혜화동',
      detailAddress: '105층',
      longitude: baseCoord.lng + 0.0,
      latitude: baseCoord.lat - 0.001,
      contractType: 'JEONSE',
      houseType: 'ETC',
      depositBig: 1,
      depositSmall: 2000,
      managementFee: 10,
      moveInInfo: '9월초',
      categoryMemoList: [
        { categoryId: 0, memo: '필수 확인 메모 입니다!!' },
        { categoryId: 1, memo: '메인 공간 메모입니다' },
        { categoryId: 3, memo: '욕실 공간 메모입니다' },
      ],
    }),
    makeProp({
      propertyId: 1202,
      planId: 1,
      folderId: 103,
      feeling: 'GOOD',
      propertyName: '골목 안쪽 조용한 집',
      memo: '메모 입니다',
      referenceUrl: 'https://naver.me/Gub7uDq5',
      address: '서울특별시 종로구 혜화동',
      detailAddress: '105층',
      longitude: baseCoord.lng - 0.001,
      latitude: baseCoord.lat + 0.0,
      contractType: 'MONTHLY_RENT',
      houseType: 'ETC',
      depositBig: 0,
      depositSmall: 500,
      managementFee: 80,
      moveInInfo: '9월초',
      categoryMemoList: [
        { categoryId: 0, memo: '필수 확인 메모 입니다!!' },
        { categoryId: 1, memo: '메인 공간 메모입니다' },
        { categoryId: 3, memo: '욕실 공간 메모입니다' },
      ],
    }),
  ],
  104: new Array(6).fill(0).map((_, i) =>
    makeProp({
      propertyId: 1301 + i,
      planId: 1,
      folderId: 104,
      feeling: 'GOOD',
      propertyName: `기본 매물 ${i + 1}`,
      memo: '메모 입니다',
      referenceUrl: 'https://naver.me/Gub7uDq5',
      address: '서울특별시 종로구 혜화동',
      detailAddress: '105층',
      longitude: baseCoord.lng + i * 0.0002,
      latitude: baseCoord.lat + 0,
      contractType: 'MONTHLY_RENT',
      houseType: 'ETC',
      depositBig: 0,
      depositSmall: 2000,
      managementFee: 40,
      moveInInfo: '9월초',
      categoryMemoList: [
        { categoryId: 0, memo: '필수 확인 메모 입니다!!' },
        { categoryId: 1, memo: '메인 공간 메모입니다' },
        { categoryId: 3, memo: '욕실 공간 메모입니다' },
      ],
    })
  ),
  105: new Array(6).fill(0).map((_, i) =>
    makeProp({
      propertyId: 1401 + i,
      planId: 1,
      memoType: 'NEARBY',
      folderId: 105,
      nearTag: 'TRAFFIC',
      feeling: 'GOOD',
      propertyName: `후문 옆빌 앞 집 ${i + 1}`,
      memo: '메모 입니다',
      referenceUrl: 'https://naver.me/Gub7uDq5',
      address: '서울특별시 종로구 혜화동',
      detailAddress: '105층',
      longitude: baseCoord.lng + i * 0.0002,
      latitude: baseCoord.lat + 0,
      contractType: 'MONTHLY_RENT',
      houseType: 'ETC',
      depositBig: 0,
      depositSmall: 2000,
      managementFee: 40,
      moveInInfo: '9월초',
      categoryMemoList: [
        { categoryId: 0, memo: '필수 확인 메모 입니다!!' },
        { categoryId: 1, memo: '메인 공간 메모입니다' },
        { categoryId: 3, memo: '욕실 공간 메모입니다' },
      ],
    })
  ),
  // 다른 계획의 폴더는 간단히 0~2개만
  201: [
    makeProp({
      propertyId: 2001,
      planId: 2,
      folderId: 201,
      feeling: 'GOOD',
      propertyName: '기숙사 후문',
      memo: '메모 입니다',
      referenceUrl: 'https://naver.me/Gub7uDq5',
      address: '서울특별시 종로구 혜화동',
      detailAddress: '105층',
      longitude: baseCoord.lng + 0.0002,
      latitude: baseCoord.lat + 0.001,
      contractType: 'MONTHLY_RENT',
      houseType: 'ETC',
      depositBig: 7,
      depositSmall: 10,
      managementFee: 10,
      moveInInfo: '9월초',
      categoryMemoList: [
        { categoryId: 0, memo: '필수 확인 메모 입니다!!' },
        { categoryId: 1, memo: '메인 공간 메모입니다' },
        { categoryId: 3, memo: '욕실 공간 메모입니다' },
      ],
    }),
  ],
  301: [
    makeProp({
      propertyId: 3001,
      planId: 3,
      folderId: 301,
      feeling: 'GOOD',
      propertyName: '역 앞 빌라',
      memo: '메모 입니다',
      referenceUrl: 'https://naver.me/Gub7uDq5',
      address: '서울특별시 종로구 혜화동',
      detailAddress: '105층',
      longitude: baseCoord.lng - 0.0005,
      latitude: baseCoord.lat + 0.0005,
      contractType: 'PURCHASE',
      houseType: 'ETC',
      depositBig: 1,
      depositSmall: 9000,
      managementFee: 50,
      moveInInfo: '9월초',
      categoryMemoList: [
        { categoryId: 0, memo: '필수 확인 메모 입니다!!' },
        { categoryId: 1, memo: '메인 공간 메모입니다' },
        { categoryId: 3, memo: '욕실 공간 메모입니다' },
      ],
    }),
  ],
  401: [
    makeProp({
      propertyId: 4001,
      planId: 4,
      folderId: 401,
      feeling: 'SOSO',
      propertyName: '정문 앞 원룸',
      memo: '메모 입니다',
      referenceUrl: 'https://naver.me/Gub7uDq5',
      address: '서울특별시 종로구 혜화동',
      detailAddress: '105층',
      longitude: baseCoord.lng + 0.0001,
      latitude: baseCoord.lat + 0.0003,
      contractType: 'JEONSE',
      houseType: 'ETC',
      depositBig: 1,
      depositSmall: 2000,
      managementFee: 10,
      moveInInfo: '9월초',
      categoryMemoList: [
        { categoryId: 0, memo: '필수 확인 메모 입니다!!' },
        { categoryId: 1, memo: '메인 공간 메모입니다' },
        { categoryId: 3, memo: '욕실 공간 메모입니다' },
      ],
    }),
  ],
};

// Detail DB: 요약과 id만 맞춰 주고, 상세는 동일 스키마
const detailById: Record<number, PropertySummary> = {};
Object.values(propsByFolder)
  .flat()
  .forEach((p) => {
    detailById[p.propertyId] = p;
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

export function getPropertyDetail(propertyId: number): PropertySummary | undefined {
  return detailById[propertyId];
}
