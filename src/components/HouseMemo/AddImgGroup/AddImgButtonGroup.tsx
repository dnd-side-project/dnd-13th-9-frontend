import React from 'react';
import { AddImgButton } from './AddImg/AddImgButton';

export function AddImgButtonGroup() {
  return (
    <div className="flex min-h-[225px] max-w-[720px] gap-2 overflow-x-auto px-6">
      <AddImgButton size="lg" />

      <div className="flex shrink-0 flex-col items-center gap-2">
        <AddImgButton size="sm" />
        <AddImgButton size="sm" />
      </div>

      <AddImgButton size="lg" />

      <div className="flex shrink-0 flex-col items-center gap-2">
        <AddImgButton size="sm" />
        <AddImgButton size="sm" />
      </div>
    </div>
  );
}
