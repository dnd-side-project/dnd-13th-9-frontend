export type Image = {
  imageId: number;
  url: string;
  order: number;
};

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

export type HouseMemoData = {
  images: Image[];
  propertyId: number;
  planId: number;
  planName: string;
  folderId: number;
  folderName: string;
  feeling: 'GOOD' | 'SOSO' | 'BAD';
  propertyName: string;
  memo?: string;
  referenceUrl?: string | null;
  address: string;
  detailAddress?: string;
  latitude: number;
  longitude: number;
  contractType: 'MONTHLY_RENT' | 'JEONSE' | 'PURCHASE';
  houseType:
    | 'OFFICETEL'
    | 'ONEROOM'
    | 'APARTMENT'
    | 'VILLA'
    | 'COLIVING'
    | 'GOSIWON'
    | 'BOARDING'
    | 'ETC';
  depositBig?: number;
  depositSmall?: number;
  managementFee?: number | null;
  moveInInfo?: string;
  checklist: Checklist;
};

export type ApiResponse<T = HouseMemoData> = {
  code: string;
  message: string;
  data: T | null;
};
