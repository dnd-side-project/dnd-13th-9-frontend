import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNearbyMemo } from '@/services/nearby.memo';
import { CreateNearbyMemoResponse } from '@/types/nearby-memo';
import { useNearbyMemo } from '@/contexts';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { folderKeys } from '@/queries/folder/useFoldersQuery';
import { folderMemoKeys } from '@/queries/folder/useFolderMemosQuery';
import { TOAST_STYLES } from '@/utils/toastStyles';

type CreateNearbyMemoParams = {
  selectedFolderId: number;
  images?: string[];
};

const resizeImageToBlob = (
  base64: string,
  maxWidth = 1024,
  maxHeight = 1024,
  quality = 0.7
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64;
    img.onload = () => {
      let { width, height } = img;
      if (width > maxWidth) {
        height *= maxWidth / width;
        width = maxWidth;
      }
      if (height > maxHeight) {
        width *= maxHeight / height;
        height = maxHeight;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject('Canvas context not available');
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject('Failed to convert image to blob');
        },
        'image/jpeg',
        quality
      );
    };
    img.onerror = (err) => reject(err);
  });
};

export function useCreateNearbyMemo() {
  const queryClient = useQueryClient();
  const { nearbyMemo } = useNearbyMemo();
  const router = useRouter();

  return useMutation<CreateNearbyMemoResponse, Error, CreateNearbyMemoParams>({
    mutationFn: async ({ selectedFolderId, images }: CreateNearbyMemoParams) => {
      const formData = new FormData();

      const latestNearbyMemo = nearbyMemo;

      formData.append('title', latestNearbyMemo.title || '새로운 장소 메모');
      formData.append('description', latestNearbyMemo.description || '');
      formData.append('placeTag', latestNearbyMemo.placeTag || 'ADVANTAGE');
      formData.append('address', latestNearbyMemo.address || '');
      formData.append('latitude', String(latestNearbyMemo.latitude || 0));
      formData.append('longitude', String(latestNearbyMemo.longitude || 0));
      formData.append('folderId', String(selectedFolderId));

      const getImagesFromStorage = (): string[] => {
        if (typeof window === 'undefined') return [];
        try {
          const stored = localStorage.getItem('nearbyInfoImg');
          if (!stored) return [];

          const storedImages = JSON.parse(stored);

          if (Array.isArray(storedImages)) {
            const filteredImages = storedImages.filter((img: string) => img && img.trim() !== '');

            return filteredImages;
          }

          return [];
        } catch (error) {
          console.error('Failed to parse images from localStorage:', error);
          return [];
        }
      };

      const imagesToProcess = images?.slice(0, 6) || getImagesFromStorage().slice(0, 6);

      let processedImageCount = 0;
      const failedImages: number[] = [];

      const imagePromises = imagesToProcess.map(async (imageData, index) => {
        try {
          const blob = await resizeImageToBlob(imageData);
          formData.append('images', blob, `image_${index}.jpg`);
          processedImageCount++;

          return { success: true, index };
        } catch (err) {
          failedImages.push(index);
          return { success: false, index, error: err };
        }
      });

      await Promise.allSettled(imagePromises);

      if (failedImages.length > 0) {
        toast.error(`${failedImages.length}개의 이미지 처리에 실패했습니다.`, TOAST_STYLES.error);
      }

      const formDataEntries = Array.from(formData.entries());
      const imageEntries = formDataEntries.filter(([key]) => key === 'images');

      return await createNearbyMemo(formData);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['nearby-memo'] });

      const folderId = variables.selectedFolderId;
      if (Number.isFinite(folderId)) {
        queryClient.invalidateQueries({ queryKey: folderMemoKeys.byFolder(folderId) });
      }
      queryClient.invalidateQueries({ queryKey: folderKeys.all });

      toast.success('주변메모 장소 저장을 성공했습니다', TOAST_STYLES.success);
      router.push('/map');

      localStorage.removeItem('nearbyMemo');
      localStorage.removeItem('nearbyInfoImg');
    },
    onError: (error: any) => {
      toast.error(error?.data || '저장 중 오류가 발생했습니다.', TOAST_STYLES.error);
    },
  });
}
