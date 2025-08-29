import { useChecklistInfo } from '@/queries/houseMemo/useChecklistInfo';
import { ChecklistItem } from '@/types/checklist';

export const useCheckList = () => {
  const { data, isLoading, error } = useChecklistInfo();

  const checkListData = data?.data;

  const categories = checkListData?.categories || [];
  const sections = checkListData?.sections || [];

  const getSectionItems = (categoryName: string) => {
    const section = sections.find((s) => s.categoryName === categoryName);
    return section?.items || [];
  };

  const isLastItem = (itemId: number, items: ChecklistItem[]) => {
    return itemId === items[items.length - 1]?.itemId;
  };

  const hasRequiredItems = (items: ChecklistItem[]) => {
    return items.length > 0;
  };

  return {
    categories,
    sections,
    getSectionItems,
    isLastItem,
    hasRequiredItems,
    isLoading,
    error,
  };
};
