import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createHouseMemo } from '@/services/house.memo';
import { HouseMemo } from '@/types/house-memo';

interface CreatePropertyParams {
  houseMemo: HouseMemo;
  selectedFolderId: number;
  images?: string[];
}

export function useCreateProperty() {
  const queryClient = useQueryClient();

  return useMutation<HouseMemo, Error, CreatePropertyParams>({
    mutationFn: async ({ houseMemo, selectedFolderId, images }) => {
      const formData = new FormData();

      const propertyData = {
        ...houseMemo,
        folderId: selectedFolderId,
        propertyName: houseMemo.propertyName || '새로운 매물',
      };

      formData.append('data', JSON.stringify(propertyData));

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

      for (const [key, value] of formData.entries()) {
        if (key === 'data') {
          console.log(`${key}:`, value);
        } else {
          console.log(`${key}:`, value instanceof Blob ? `Blob (${value.size} bytes)` : value);
        }
      }

      const result = await createHouseMemo(formData);
      return result;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['house-memo'],
      });
    },
    onError: (error: any) => {
      console.error('Error creating property:', error);
    },
  });
}
