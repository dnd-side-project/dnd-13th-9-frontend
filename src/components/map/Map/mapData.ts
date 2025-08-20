export const categories = ['계획', '학교', '직장', '기타'] as const;

export type Category = (typeof categories)[number];

export const allFolders: Record<Category, string[]> = {
  계획: ['복학', '판교 인턴 단기로', '수원 캠퍼스 근처 스 근'],
  학교: ['북학', '수원 캠퍼스 근처'],
  직장: ['인근 회사', '프로젝트 장소'],
  기타: ['임시 폴더'],
};
