// 계약 타입 라벨 매핑
export function getContractLabel(ct: string): string {
  const MAP: Record<string, string> = {
    MONTHLY_RENT: '월세',
    JEONSE: '전세',
    PURCHASE: '매매',
  };
  return MAP[ct] ?? ct;
}

// 주거 유형 라벨 매핑 (여러 키 대응)
export function getHouseTypeLabel(type: string): string {
  const MAP: Record<string, string> = {
    OFFICETEL: '오피스텔',
    ONEROOM: '원룸',
    APT: '아파트',
    APARTMENT: '아파트',
    VILLA: '빌라',
    COLIVING: '코리빙',
    GOSIWON: '고시원',
    BOARDING: '하숙',
    ETC: '기타',
  };
  return MAP[type] ?? type;
}
