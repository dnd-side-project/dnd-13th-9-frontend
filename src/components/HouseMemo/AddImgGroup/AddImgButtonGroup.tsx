import React from 'react';
import { AddImgButton } from './AddImg/AddImgButton';

export function AddImgButtonGroup() {
  return (
    <div className="flex min-h-[225px] max-w-[720px] gap-2 overflow-x-auto px-6">
      <AddImgButton size="lg" index={0} />

      <div className="flex shrink-0 flex-col items-center gap-2">
        <AddImgButton size="sm" index={1} />
        <AddImgButton size="sm" index={2} />
      </div>

      <AddImgButton size="lg" index={3} />

      <div className="flex shrink-0 flex-col items-center gap-2">
        <AddImgButton size="sm" index={4} />
        <AddImgButton size="sm" index={5} />
      </div>
    </div>
  );
}
