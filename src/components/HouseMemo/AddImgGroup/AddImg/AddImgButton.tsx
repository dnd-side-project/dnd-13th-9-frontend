'use client';
import React, { useRef, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/utils/utils';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { Button } from '@/components/ui/Button';
import { useBottomSheet } from '@/hooks/useBottomSheet';

type AddImgProps = {
  size?: 'sm' | 'lg';
};

export function AddImgButton({ size = 'lg' }: AddImgProps) {
  const { isOpen, open, close } = useBottomSheet();
  const [preview, setPreview] = useState<string | null>(null);
  const isSmall = size === 'sm';

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleAlbumClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <button
        className={cn(
          'bg-neutral-30 relative flex shrink-0 items-center justify-center rounded-2xl bg-cover bg-center',
          isSmall ? 'h-[108px] w-[108px]' : 'h-[225px] w-[225px]'
        )}
        style={{ backgroundImage: preview ? `url(${preview})` : undefined }}
        onClick={open}
      >
        {!preview && <Icon name="addImage" color="neutral" width={40} height={40} />}
      </button>

      <BottomSheet isOpen={isOpen} closeModal={close} className="flex justify-center">
        <div className="flex flex-col justify-center gap-4 p-5">
          <label className="cursor-pointer">
            <input type="file" className="hidden" accept=".png, .jpg" onChange={handleFileChange} />
            <Button variant="primary" size="large" className="w-full">
              사진 촬영하기
            </Button>
          </label>

          <Button variant="tertiary" size="large" onClick={handleAlbumClick}>
            앨범에서 선택하기
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".png, .jpg"
            onChange={(e) => {
              handleFileChange(e);
              close();
            }}
          />
        </div>
      </BottomSheet>
    </div>
  );
}
