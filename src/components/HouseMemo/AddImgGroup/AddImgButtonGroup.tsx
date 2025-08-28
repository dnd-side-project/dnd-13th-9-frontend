import React, { useEffect, useState } from 'react';
import { AddImgButton } from './AddImg/AddImgButton';

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

  const addImageAtIndex = (index: number, imageData: string) => {
    if (index >= 0 && index < 6) {
      const newArray = [...localImages];
      newArray[index] = imageData;
      setLocalImages(newArray);

      if (storageKey) {
        localStorage.setItem(storageKey, JSON.stringify(newArray));
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
