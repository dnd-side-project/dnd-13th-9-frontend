// ChecklistItem
export interface ChecklistItem {
  id: number;
  question: string;
  description?: string;
}

// Category
export interface ChecklistCategory {
  order: number;
  name: string;
}

// Section
export interface ChecklistSection {
  categoryId: number;
  categoryName: string;
  items: ChecklistItem[];
}

// data 객체
export interface ChecklistData {
  categories: ChecklistCategory[];
  sections: ChecklistSection[];
}

// 최상위 응답
export interface ChecklistResponse {
  code: string;
  message: string;
  data: ChecklistData;
}
