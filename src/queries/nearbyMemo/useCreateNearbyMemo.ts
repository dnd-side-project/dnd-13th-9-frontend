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

      const getLatestNearbyMemo = (): NearbyMemo => {
        if (nearbyMemo && nearbyMemo.title && nearbyMemo.address) {
          return nearbyMemo;
        }

        if (typeof window === 'undefined') {
          return {
            title: '',
            description: '',
            placeTag: 'ADVANTAGE',
            address: '',
            latitude: 0,
            longitude: 0,
            folderId: 0,
          };
        }

        try {
          const stored = localStorage.getItem('nearbyMemo');
          if (stored) {
            return JSON.parse(stored);
          }
        } catch (error) {
          console.error('Failed to parse nearby memo from localStorage:', error);
        }

        return {
          title: '',
          description: '',
          placeTag: 'ADVANTAGE',
          address: '',
          latitude: 0,
          longitude: 0,
          folderId: 0,
        };
      };

      const getImagesFromStorage = (): string[] => {
        if (typeof window === 'undefined') return [];
        try {
          return JSON.parse(localStorage.getItem('nearbyInfoImg') || '[]');
        } catch (error) {
          console.error('Failed to parse images from localStorage:', error);
          return [];
        }
      };

      const latestNearbyMemo = getLatestNearbyMemo();

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
            const byteCharacters = atob(imageData.split(',')[1]);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'image/jpeg' });

            formData.append('images', blob, `image_${index}.jpg`);
          } catch (imageError) {
            console.error(`Failed to process image ${index}:`, imageError);
          }
        });
      }

      console.log('Sending nearby memo data:', Object.fromEntries(formData.entries()));
      console.log('Images count:', imagesToProcess?.length || 0);

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
