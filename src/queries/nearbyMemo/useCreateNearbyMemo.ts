import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNearbyMemo } from '@/services/nearby.memo';
import { NearbyMemo } from '@/types/nearby-memo';
import { useNearbyMemo } from '@/contexts';

type CreateNearbyMemoParams = {
  selectedFolderId: number;
  images?: string[];
};

export function useCreateNearbyMemo() {
  const queryClient = useQueryClient();
  const { nearbyMemo } = useNearbyMemo();

  return useMutation<NearbyMemo, Error, CreateNearbyMemoParams>({
    mutationFn: async ({ selectedFolderId, images }) => {
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['nearby-memo'],
      });
    },
    onError: (error: any) => {
      console.error('Error creating nearby memo:', error);
    },
  });
}
