'use client';

import React from 'react';
import { PlanGrid } from '@/components/map/ListTab/section/PlanGrid';
import { FolderGrid } from '@/components/map/ListTab/section/FolderGrid';

export function MapList() {
  return (
    <div className="flex h-full flex-col gap-14 overflow-hidden py-4">
      <PlanGrid />
      <FolderGrid />
    </div>
  );
}

export default MapList;
