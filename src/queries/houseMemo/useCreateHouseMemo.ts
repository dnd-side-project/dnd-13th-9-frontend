import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createHouseMemo } from '@/services/house.memo';
import { HouseMemo } from '@/types/house-memo';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { folderKeys } from '@/queries/folder/useFoldersQuery';
import { folderMemoKeys } from '@/queries/folder/useFolderMemosQuery';

type CreatePropertyParams = {
  houseMemo: HouseMemo;
  selectedFolderId: number;
  images?: string[];
  formData?: FormData;
};

export function useCreateProperty() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<HouseMemo, Error, CreatePropertyParams>({
    mutationFn: async ({ houseMemo, selectedFolderId, images, formData: passedFormData }) => {
      let formData: FormData;
      let propertyData: any;

      if (passedFormData) {
        formData = passedFormData;

        propertyData = {
          ...houseMemo,
          folderId: selectedFolderId,
          propertyName: houseMemo.propertyName || '새로운 매물',
          latitude: Number(houseMemo.latitude) || 0,
          longitude: Number(houseMemo.longitude) || 0,
        };

        const jsonBlob = new Blob([JSON.stringify(propertyData)], {
          type: 'application/json',
        });
        formData.append('data', jsonBlob, 'data.json');
      } else {
        const getLatestHouseMemo = () => {
          if (typeof window === 'undefined') return houseMemo;
          try {
            const stored = localStorage.getItem('houseMemo');
            return stored ? { ...houseMemo, ...JSON.parse(stored) } : houseMemo;
          } catch (error) {
            console.error('Failed to parse house memo from localStorage:', error);
            return houseMemo;
          }
        };

        const latestHouseMemo = getLatestHouseMemo();
        formData = new FormData();

        propertyData = {
          ...latestHouseMemo,
          folderId: selectedFolderId,
          propertyName: latestHouseMemo.propertyName || '새로운 매물',
          latitude: Number(latestHouseMemo.latitude) || 0,
          longitude: Number(latestHouseMemo.longitude) || 0,
        };

        const jsonBlob = new Blob([JSON.stringify(propertyData)], {
          type: 'application/json',
        });
        formData.append('data', jsonBlob, 'data.json');
      }

      if (images && images.length > 0) {
        images.forEach((imageData: string, index: number) => {
          try {
            const byteCharacters = atob(imageData.split(',')[1]);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'image/jpeg' });

            formData.append('image', blob, `image_${index}.jpg`);
          } catch (imageError) {
            console.error(`Failed to process image ${index}:`, imageError);
          }
        });
      }

      const result = await createHouseMemo(formData);
      return result;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['house-memo'] });
      // 새 메모가 속한 폴더의 메모 목록 및 해당 플랜의 폴더 목록(카운트) 무효화
      const folderId = variables.selectedFolderId;
      if (Number.isFinite(folderId)) {
        queryClient.invalidateQueries({ queryKey: folderMemoKeys.byFolder(folderId) });
      }
      // 폴더 리스트는 planId로 키가 잡혀 있으므로, 근처에서 최신 planId를 유도할 수 없으면 전체 folders를 무효화
      queryClient.invalidateQueries({ queryKey: folderKeys.all });
      toast.success('매물 정보가 저장되었습니다!');
      router.push('/map');
      localStorage.removeItem('houseMemo');
      localStorage.removeItem('images');
    },
    onError: (error: any) => {
      console.error('Error creating property:', error);
    },
  });
}
