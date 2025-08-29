import React, { useEffect, useState } from 'react';
import { AddImgButton } from './AddImg/AddImgButton';

const resizeImageToBlob = (
  base64: string,
  maxWidth = 800,
  maxHeight = 800,
  quality = 0.6
): Promise<string> => {
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
          if (blob) {
            const reader = new FileReader();
            reader.onload = () => {
              resolve(reader.result as string);
            };
            reader.readAsDataURL(blob);
          } else {
            reject('Failed to convert image to blob');
          }
        },
        'image/jpeg',
        quality
      );
    };
    img.onerror = (err) => reject(err);
  });
};

type AddImgButtonGroupProps = {
  images?: Array<{ url: string; order: number }>;
  readonly?: boolean;
  storageKey?: string;
};

export function AddImgButtonGroup({
  images = [],
  readonly = false,
  storageKey,
}: AddImgButtonGroupProps) {
  const [localImages, setLocalImages] = useState<string[]>(['', '', '', '', '', '']);

  useEffect(() => {
    if (storageKey && typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          const storedImages = JSON.parse(stored);

          if (Array.isArray(storedImages)) {
            const newArray = ['', '', '', '', '', ''];
            storedImages.forEach((img: string, idx: number) => {
              if (idx < 6) {
                newArray[idx] = img || '';
              }
            });
            setLocalImages(newArray);
          }
        }
      } catch (error) {
        console.error('Failed to parse images from localStorage:', error);
      }
    }
  }, [storageKey]);

  const addImageAtIndex = async (index: number, imageData: string) => {
    if (index >= 0 && index < 6) {
      try {
        const compressedImage = await resizeImageToBlob(imageData);

        const newArray = [...localImages];
        newArray[index] = compressedImage;
        setLocalImages(newArray);

        if (storageKey) {
          localStorage.setItem(storageKey, JSON.stringify(newArray));
        }
      } catch (error) {
        console.error('이미지 압축 실패:', error);

        const newArray = [...localImages];
        newArray[index] = imageData;
        setLocalImages(newArray);

        if (storageKey) {
          localStorage.setItem(storageKey, JSON.stringify(newArray));
        }
      }
    }
  };

  const removeImageAtIndex = (index: number) => {
    if (index >= 0 && index < 6) {
      const newArray = [...localImages];
      newArray[index] = '';
      setLocalImages(newArray);

      if (storageKey) {
        localStorage.setItem(storageKey, JSON.stringify(newArray));
      }
    }
  };

  const displayImages = storageKey ? localImages : images.map((img) => img.url);

  return (
    <div className="scrollbar-hidden flex min-h-[225px] max-w-[720px] gap-2 overflow-x-auto px-1">
      <AddImgButton
        size="lg"
        index={0}
        readonly={readonly}
        imageUrl={displayImages[0]}
        storageKey={storageKey}
        onImageAdd={(imageData) => addImageAtIndex(0, imageData)}
        onImageRemove={() => removeImageAtIndex(0)}
      />

      <div className="flex shrink-0 flex-col items-center gap-2">
        <AddImgButton
          size="sm"
          index={1}
          readonly={readonly}
          imageUrl={displayImages[1]}
          storageKey={storageKey}
          onImageAdd={(imageData) => addImageAtIndex(1, imageData)}
          onImageRemove={() => removeImageAtIndex(1)}
        />
        <AddImgButton
          size="sm"
          index={2}
          readonly={readonly}
          imageUrl={displayImages[2]}
          storageKey={storageKey}
          onImageAdd={(imageData) => addImageAtIndex(2, imageData)}
          onImageRemove={() => removeImageAtIndex(2)}
        />
      </div>

      <AddImgButton
        size="lg"
        index={3}
        readonly={readonly}
        imageUrl={displayImages[3]}
        storageKey={storageKey}
        onImageAdd={(imageData) => addImageAtIndex(3, imageData)}
        onImageRemove={() => removeImageAtIndex(3)}
      />

      <div className="flex shrink-0 flex-col items-center gap-2">
        <AddImgButton
          size="sm"
          index={4}
          readonly={readonly}
          imageUrl={displayImages[4]}
          storageKey={storageKey}
          onImageAdd={(imageData) => addImageAtIndex(4, imageData)}
          onImageRemove={() => removeImageAtIndex(4)}
        />
        <AddImgButton
          size="sm"
          index={5}
          readonly={readonly}
          imageUrl={displayImages[5]}
          storageKey={storageKey}
          onImageAdd={(imageData) => addImageAtIndex(5, imageData)}
          onImageRemove={() => removeImageAtIndex(5)}
        />
      </div>
    </div>
  );
}
