'use client';
import React, { useRef } from 'react';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/utils/utils';
import { useImageLocalStorage } from '@/hooks/useImageLocalStorage';

type Props = {
  size?: 'sm' | 'lg';
  index?: number;
  readonly?: boolean;
  imageUrl?: string;
  storageKey?: string;
};

export function AddImgButton({
  size = 'lg',
  index,
  readonly = false,
  imageUrl,
  storageKey,
}: Props) {
  const isSmall = size === 'sm';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { preview, handleFileChange } = useImageLocalStorage(storageKey || index, index);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileChange(file);
  };

  const handleClick = () => {
    if (!readonly) fileInputRef.current?.click();
  };

  const bgImage = readonly ? imageUrl : preview;

  return (
    <div>
      <button
        type="button"
        disabled={readonly}
        className={cn(
          'bg-neutral-30 relative flex shrink-0 items-center justify-center rounded-2xl bg-cover bg-center',
          isSmall ? 'h-[108px] w-[108px]' : 'h-[225px] w-[225px]'
        )}
        style={{ backgroundImage: bgImage ? `url(${bgImage})` : undefined }}
        onClick={handleClick}
      >
        {!bgImage && <Icon name="addImage" color="neutral" width={40} height={40} />}
      </button>

      {!readonly && (
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".png, .jpg, .jpeg"
          multiple={false}
          onChange={onFileChange}
        />
      )}
    </div>
  );
}
