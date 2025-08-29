import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNearbyMemo } from '@/services/nearby.memo';
import { NearbyMemo, CreateNearbyMemoResponse } from '@/types/nearby-memo';
import { useNearbyMemo } from '@/contexts';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { folderKeys } from '@/queries/folder/useFoldersQuery';
import { folderMemoKeys } from '@/queries/folder/useFolderMemosQuery';

type CreateNearbyMemoParams = {
  selectedFolderId: number;
  images?: string[];
};

export function useCreateNearbyMemo() {
  const queryClient = useQueryClient();
  const { nearbyMemo } = useNearbyMemo();
  const router = useRouter();

  const processBase64ToBlob = async (base64: string): Promise<Blob> => {
    const res = await fetch(base64);
    return await res.blob();
  };

  return useMutation<CreateNearbyMemoResponse, Error, CreateNearbyMemoParams>({
    mutationFn: async ({ selectedFolderId, images }: CreateNearbyMemoParams) => {
      const formData = new FormData();

      const getImagesFromStorage = (): string[] => {
        if (typeof window === 'undefined') return [];
        try {
          return JSON.parse(localStorage.getItem('nearbyInfoImg') || '[]');
        } catch (error) {
          console.error('Failed to parse images from localStorage:', error);
          return [];
        }
      };

      const latestNearbyMemo = nearbyMemo;

      formData.append('title', latestNearbyMemo.title || '새로운 장소 메모');
      formData.append('description', latestNearbyMemo.description || '');
      formData.append('placeTag', latestNearbyMemo.placeTag || 'ADVANTAGE');
      formData.append('address', latestNearbyMemo.address || '');
      formData.append('latitude', String(latestNearbyMemo.latitude || 0));
      formData.append('longitude', String(latestNearbyMemo.longitude || 0));
      formData.append('folderId', String(selectedFolderId));

      const imagesToProcess = images || getImagesFromStorage();

      if (imagesToProcess.length > 0) {
        for (const [index, imageData] of imagesToProcess.entries()) {
          try {
            const blob = await processBase64ToBlob(imageData);
            const extension = blob.type.split('/')[1] || 'jpg';
            formData.append('images', blob, `image_${index}.${extension}`);
          } catch (error) {
            console.error(`Failed to process image ${index}:`, error);
          }
        }
      }

      const result = await createNearbyMemo(formData);
      return result;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['nearby-memo'] });

      const folderId = variables.selectedFolderId;
      if (Number.isFinite(folderId)) {
        queryClient.invalidateQueries({ queryKey: folderMemoKeys.byFolder(folderId) });
      }
      queryClient.invalidateQueries({ queryKey: folderKeys.all });
      toast.success('주변메모 장소 저장을 성공했습니다');

      router.push('/map');
      localStorage.removeItem('nearbyMemo');
      localStorage.removeItem('nearbyInfoImg');
    },
    onError: (error: any) => {
      toast.error(error?.data || '저장 중 오류가 발생했습니다.');
    },
  });
}
