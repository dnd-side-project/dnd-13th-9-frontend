import React from 'react';
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
  return (
    <div className="flex min-h-[225px] max-w-[720px] gap-2 overflow-x-auto px-6">
      <AddImgButton
        size="lg"
        index={0}
        readonly={readonly}
        imageUrl={images[0]?.url}
        storageKey={storageKey}
      />

      <div className="flex shrink-0 flex-col items-center gap-2">
        <AddImgButton
          size="sm"
          index={1}
          readonly={readonly}
          imageUrl={images[1]?.url}
          storageKey={storageKey}
        />
        <AddImgButton
          size="sm"
          index={2}
          readonly={readonly}
          imageUrl={images[2]?.url}
          storageKey={storageKey}
        />
      </div>

      <AddImgButton
        size="lg"
        index={3}
        readonly={readonly}
        imageUrl={images[3]?.url}
        storageKey={storageKey}
      />

      <div className="flex shrink-0 flex-col items-center gap-2">
        <AddImgButton
          size="sm"
          index={4}
          readonly={readonly}
          imageUrl={images[4]?.url}
          storageKey={storageKey}
        />
        <AddImgButton
          size="sm"
          index={5}
          readonly={readonly}
          imageUrl={images[5]?.url}
          storageKey={storageKey}
        />
      </div>
    </div>
  );
}
