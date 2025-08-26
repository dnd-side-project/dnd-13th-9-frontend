import { useChecklistInfo } from '@/queries/houseMemo/useChecklistInfo';

export const useCheckList = () => {
  const { data, isLoading, error } = useChecklistInfo();

  const checkListData = data?.data;

  const categories = checkListData?.categories || [];
  const sections = checkListData?.sections || [];

  const getSectionItems = (categoryName: string) => {
    const section = sections.find((s) => s.categoryName === categoryName);
    return section?.items || [];
  };

  const isLastItem = (itemId: string, items: any[]) => {
    return itemId === items[items.length - 1]?.id;
  };

  const hasRequiredItems = (items: any[]) => {
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
