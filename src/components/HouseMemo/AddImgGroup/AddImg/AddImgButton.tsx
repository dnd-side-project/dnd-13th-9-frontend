'use client';
import React, { useRef, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/utils/utils';
import { DeleteDataModal } from '@/components/ui/DeleteDataModal';
import Image from 'next/image';

type Props = {
  size?: 'sm' | 'lg';
  index?: number;
  readonly?: boolean;
  imageUrl?: string;
  storageKey?: string;
  onImageAdd?: (imageData: string) => void;
  onImageRemove?: () => void;
};

export function AddImgButton({
  size = 'lg',
  index,
  readonly = false,
  imageUrl,
  storageKey,
  onImageAdd,
  onImageRemove,
}: Props) {
  const isSmall = size === 'sm';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const bgImage = imageUrl && imageUrl.trim() !== '' ? imageUrl : null;

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageAdd) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const result = event.target?.result;
        if (typeof result === 'string') {
          onImageAdd(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    if (readonly) return;

    if (bgImage) {
      setIsDeleteModalOpen(true);
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleDeleteImage = () => {
    if (onImageRemove) {
      onImageRemove();
    }
    setIsDeleteModalOpen(false);
  };

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
        {!bgImage &&
          (readonly ? (
            <Image src="/assets/ico-no-image.svg" alt="no image" width={40} height={40} />
          ) : (
            <Icon name="addImage" color="neutral" width={40} height={40} />
          ))}
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

      <DeleteDataModal
        isOpen={isDeleteModalOpen}
        closeModal={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteImage}
        title="선택한 이미지를"
        confirmText="삭제"
      />
    </div>
  );
}
