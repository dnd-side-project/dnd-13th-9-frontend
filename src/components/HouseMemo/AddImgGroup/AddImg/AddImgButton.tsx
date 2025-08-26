'use client';
import React, { useRef } from 'react';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/utils/utils';
import { useImageLocalStorage } from '@/hooks/useImageLocalStorage';

type Props = {
  size?: 'sm' | 'lg';
  index?: number;
};

export function AddImgButton({ size = 'lg', index }: Props) {
  const isSmall = size === 'sm';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { preview, handleFileChange } = useImageLocalStorage(index);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileChange(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <button
        type="button"
        className={cn(
          'bg-neutral-30 relative flex shrink-0 items-center justify-center rounded-2xl bg-cover bg-center',
          isSmall ? 'h-[108px] w-[108px]' : 'h-[225px] w-[225px]'
        )}
        style={{ backgroundImage: preview ? `url(${preview})` : undefined }}
        onClick={handleClick}
      >
        {!preview && <Icon name="addImage" color="neutral" width={40} height={40} />}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept=".png, .jpg, .jpeg"
        onChange={onFileChange}
      />
    </div>
  );
}
