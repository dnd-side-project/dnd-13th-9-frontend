import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNearbyMemo } from '@/services/nearby.memo';
import { NearbyMemo } from '@/types/nearby-memo';

type CreateNearbyMemoParams = {
  selectedFolderId: number;
  images?: string[];
  formData?: FormData;
};

export function useCreateNearbyMemo() {
  const queryClient = useQueryClient();

  return useMutation<NearbyMemo, Error, CreateNearbyMemoParams>({
    mutationFn: async ({ selectedFolderId, images, formData: passedFormData }) => {
      let formData: FormData;
      let memoData: any;

      const getLatestNearbyMemo = (): NearbyMemo => {
        if (typeof window === 'undefined') {
          return {
            title: '',
            description: '',
            placeTag: 'STRENGTH',
            address: '',
            latitude: 0,
            longitude: 0,
            folderId: 0,
          };
        }

        try {
          const stored = localStorage.getItem('nearbyMemo');
          return stored
            ? JSON.parse(stored)
            : {
                title: '',
                description: '',
                placeTag: 'STRENGTH',
                address: '',
                latitude: 0,
                longitude: 0,
                folderId: 0,
              };
        } catch (error) {
          console.error('Failed to parse nearby memo from localStorage:', error);
          return {
            title: '',
            description: '',
            placeTag: 'STRENGTH',
            address: '',
            latitude: 0,
            longitude: 0,
            folderId: 0,
          };
        }
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

      if (passedFormData) {
        formData = passedFormData;
        const latestNearbyMemo = getLatestNearbyMemo();

        memoData = {
          ...latestNearbyMemo,
          folderId: selectedFolderId,
          title: latestNearbyMemo.title || '새로운 장소 메모',
          latitude: Number(latestNearbyMemo.latitude) || 0,
          longitude: Number(latestNearbyMemo.longitude) || 0,
        };

        const jsonBlob = new Blob([JSON.stringify(memoData)], {
          type: 'application/json',
        });
        formData.append('data', jsonBlob, 'data.json');
      } else {
        const latestNearbyMemo = getLatestNearbyMemo();
        formData = new FormData();

        memoData = {
          ...latestNearbyMemo,
          folderId: selectedFolderId,
          title: latestNearbyMemo.title || '새로운 장소 메모',
          latitude: Number(latestNearbyMemo.latitude) || 0,
          longitude: Number(latestNearbyMemo.longitude) || 0,
        };

        const jsonBlob = new Blob([JSON.stringify(memoData)], {
          type: 'application/json',
        });
        formData.append('data', jsonBlob, 'data.json');
      }

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

            formData.append('image', blob, `image_${index}.jpg`);
          } catch (imageError) {
            console.error(`Failed to process image ${index}:`, imageError);
          }
        });
      }

      console.log('Sending nearby memo data:', memoData);
      console.log('Images count:', imagesToProcess?.length || 0);

      const result = await createNearbyMemo(formData);
      return result;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['nearby-memo'],
      });
    },
    onError: (error: any) => {
      console.error('Error creating nearby memo:', error);
    },
  });
}
