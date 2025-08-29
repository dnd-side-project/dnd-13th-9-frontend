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

  return useMutation<CreateNearbyMemoResponse, Error, CreateNearbyMemoParams>({
    mutationFn: async ({ selectedFolderId, images }: CreateNearbyMemoParams) => {
      let formData = new FormData();

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
      if (imagesToProcess && imagesToProcess.length > 0) {
        imagesToProcess.forEach((imageData: string, index: number) => {
          try {
            const [header, data] = imageData.split(',');
            const mimeMatch = header.match(/data:([^;]+)/);
            const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
            const byteCharacters = atob(data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: mimeType });
            const extension = mimeType.split('/')[1] || 'jpg';

            formData.append('images', blob, `image_${index}.jpg`);
            formData.append('images', blob, `image_${index}.${extension}`);
          } catch (imageError) {
            console.error(`Failed to process image ${index}:`, imageError);
          }
        });
      }

      const result = await createNearbyMemo(formData);
      return result;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['nearby-memo'] });
      // 새 메모가 속한 폴더의 메모 목록 및 해당 플랜의 폴더 목록(카운트) 무효화
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
      toast.error(error.data);
    },
  });
}
