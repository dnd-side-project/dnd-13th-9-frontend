export type Feeling = 'GOOD' | 'SOSO' | 'BAD';

export type Address = {
  address_name: string;
  place_name: string;
  x: string;
  y: string;
};

export type ContractType = 'MONTHLY_RENT' | 'JEONSE' | 'PURCHASE';

export type HouseType =
  | 'OFFICETEL'
  | 'ONEROOM'
  | 'APARTMENT'
  | 'VILLA'
  | 'COLIVING'
  | 'GOSIWON'
  | 'BOARDING'
  | 'ETC';

export type ChecklistItem = {
  itemId: number;
  question: string;
  description?: string;
};

export type ChecklistSection = {
  categoryId: number;
  categoryName: string;
  memo?: string;
  items: ChecklistItem[];
};

export type ChecklistCategory = {
  order: number;
  name: string;
};

export type Checklist = {
  categories: ChecklistCategory[];
  sections: ChecklistSection[];
};

export type ChecklistMemo = {
  categoryId: number;
  memo: string;
};

// types/image.ts
export type Image = {
  imageId: number;
  url: string;
  order: number;
};

export type HouseMemo = {
  feeling?: Feeling;
  propertyName: string; // 매물명 (1~10자)
  memo?: string; // 메모 (1~80자)
  referenceUrl?: string; // 참고 링크 (최대 255자)
  address: string; // 지번 주소 (서버 형식)
  detailAddress?: string; // 상세주소
  longitude: string; // 경도
  latitude: string; // 위도
  contractType: ContractType; // 계약 형태
  houseType?: HouseType; // 집 유형
  depositBig: number; // 0~1000억 (월세: 보증금 억 단위, 전세: 전세가 억 단위, 매매: 매매가 억 단위)
  depositSmall: number; // 0~9999만원 (월세: 보증금 만원 단위, 전세: 전세가 억 단위, 매매: 매매가 억 단위)
  managementFee?: number; // 0~10000 관리비
  moveInInfo?: string; // 입주 가능 시기
  categoryMemoList?: ChecklistMemo[]; // 각 카테고리별 메모
  folderId: number; // 폴더 고유 인덱스 값
};

export type HouseMemoInputField = {
  key: keyof HouseMemo;
  label: string;
  placeholder?: string;
  required?: boolean;
  unit?: string;
};

export type HouseMemoDataById = {
  images: Image[];
  propertyId: number;
  planId: number;
  planName: string;
  folderId: number;
  folderName: string;
  feeling: Feeling;
  propertyName: string;
  memo?: string;
  referenceUrl?: string | null;
  address: string;
  detailAddress?: string;
  latitude: number;
  longitude: number;
  contractType: ContractType;
  houseType: HouseType;
  depositBig?: number;
  depositSmall?: number;
  managementFee?: number | null;
  moveInInfo?: string;
  checklist: Checklist;
};

export type ApiResponse<T = HouseMemoDataById> = {
  code: string;
  message: string;
  data: T | null;
};
