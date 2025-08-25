export type ChecklistItem = {
  id: number;
  question: string;
  description?: string;
};

export type ChecklistCategory = {
  order: number;
  name: string;
};

export type ChecklistSection = {
  categoryId: number;
  categoryName: string;
  items: ChecklistItem[];
};

export type ChecklistData = {
  categories: ChecklistCategory[];
  sections: ChecklistSection[];
};

export type ChecklistResponse = {
  code: string;
  message: string;
  data: ChecklistData;
};
