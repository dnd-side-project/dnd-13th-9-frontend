export type Feeling = 'HAPPY' | 'SOSO' | 'ANGRY';

export type ContractType = '월세' | '전세' | '매매';

export type HouseType =
  | '오피스텔'
  | '원룸'
  | '아파트'
  | '빌라'
  | '코리빙'
  | '고시원'
  | '하숙'
  | '기타';

export type HouseMemo = {
  feeling: Feeling;
  propertyName: string; // 매물명
  memo: string;
  referenceLink: string; // 참고링크
  address: string;
  detailedAddress: string;
  contractType: ContractType; // 계약 형태
  houseType: HouseType; // 집 유형
  depositSmall: string; // 보증금
  depositBig: string;
  monthlyRent: string; // 월세
  maintenanceFee: string; // 관리비
  availableDate: string; // 입주 가능 시기
};

export type HouseMemoInputField = {
  key: keyof HouseMemo;
  label: string;
  placeholder?: string;
  required?: boolean;
  unit?: string;
};
