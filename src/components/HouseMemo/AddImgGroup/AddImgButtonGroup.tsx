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
  const [localImages, setLocalImages] = useState<string[]>([]);

  useEffect(() => {
    if (storageKey && typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          setLocalImages(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Failed to parse images from localStorage:', error);
      }
    }
  }, [storageKey]);

  const displayImages = storageKey ? localImages : images.map((img) => img.url);

  return (
    <div className="flex min-h-[225px] max-w-[720px] gap-2 overflow-x-auto px-6">
      <AddImgButton
        size="lg"
        index={0}
        readonly={readonly}
        imageUrl={displayImages[0]}
        storageKey={storageKey}
      />

      <div className="flex shrink-0 flex-col items-center gap-2">
        <AddImgButton
          size="sm"
          index={1}
          readonly={readonly}
          imageUrl={displayImages[1]}
          storageKey={storageKey}
        />
        <AddImgButton
          size="sm"
          index={2}
          readonly={readonly}
          imageUrl={displayImages[2]}
          storageKey={storageKey}
        />
      </div>

      <AddImgButton
        size="lg"
        index={3}
        readonly={readonly}
        imageUrl={displayImages[3]}
        storageKey={storageKey}
      />

      <div className="flex shrink-0 flex-col items-center gap-2">
        <AddImgButton
          size="sm"
          index={4}
          readonly={readonly}
          imageUrl={displayImages[4]}
          storageKey={storageKey}
        />
        <AddImgButton
          size="sm"
          index={5}
          readonly={readonly}
          imageUrl={displayImages[5]}
          storageKey={storageKey}
        />
      </div>
    </div>
  );
}
