import React, { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/utils/utils';

type AddImgProps = {
  size?: 'sm' | 'lg';
};

export function AddImgButton({ size = 'lg' }: AddImgProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const isSmall = size === 'sm';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <button
      className={cn(
        'bg-neutral-30 relative flex shrink-0 items-center justify-center rounded-2xl bg-cover bg-center',
        isSmall ? 'h-[108px] w-[108px]' : 'h-[225px] w-[225px]'
      )}
      style={{ backgroundImage: preview ? `url(${preview})` : undefined }}
    >
      {!preview && <Icon name="addImage" width={40} height={40} />}
      <input
        type="file"
        className="absolute h-full w-full cursor-pointer opacity-0"
        onChange={handleFileChange}
        accept=".png, .jpg"
      />
    </button>
  );
}
