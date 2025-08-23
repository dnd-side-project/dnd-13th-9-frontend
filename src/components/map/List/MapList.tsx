'use client';

import React from 'react';
import { Icon } from '@/components/ui/Icon';
import { useMapStore } from '@/stores/useMapStore';

export function MapList() {
  const plans = useMapStore((s) => s.plans);
  const planId = useMapStore((s) => s.planId);
  const setPlanId = useMapStore((s) => s.setPlanId);
  const folders = useMapStore((s) => s.folders);
  const folderId = useMapStore((s) => s.folderId);
  const setFolderId = useMapStore((s) => s.setFolderId);
  const propsInFolder = useMapStore((s) => s.propsInFolder);
  const setSelectedPropId = useMapStore((s) => s.setSelectedPropId);

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* 계획 선택 (전역 스토어 연동) */}
      <div className="flex gap-2">
        {plans.map((p) => (
          <button
            key={p.planId}
            onClick={() => setPlanId(p.planId)}
            className={`rounded-full px-3 py-1 text-sm ${
              p.planId === planId ? 'bg-black text-white' : 'bg-black/5 text-black'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* 폴더 선택 (전역 스토어 연동) */}
      <div className="flex gap-2 overflow-x-auto">
        {folders.map((f) => (
          <button
            key={f.folderId}
            onClick={() => setFolderId(f.folderId)}
            className={`rounded-full px-3 py-1 text-sm whitespace-nowrap ${
              f.folderId === folderId ? 'bg-primary-50 text-white' : 'bg-black/5 text-black'
            }`}
          >
            {f.name}
            {f.recordCount ? ` ${f.recordCount}` : ''}
          </button>
        ))}
      </div>

      {/* 매물 리스트 */}
      <div className="flex flex-col divide-y divide-black/5 rounded-xl border border-black/5 bg-white">
        {propsInFolder.map((p) => (
          <button
            key={p.propertyId}
            onClick={() => setSelectedPropId(p.propertyId)}
            className="flex items-center gap-3 p-3 text-left"
          >
            <div className="bg-primary-50/10 flex h-10 w-10 items-center justify-center rounded-lg">
              <Icon
                name={p.feeling === 'GOOD' ? 'happy' : p.feeling === 'SOSO' ? 'soSo' : 'angry'}
              />
            </div>
            <div className="flex min-w-0 flex-col">
              <div className="truncate text-sm font-medium">{p.propertyName}</div>
              <div className="truncate text-xs text-black/50">{p.address}</div>
            </div>
          </button>
        ))}
        {propsInFolder.length === 0 && (
          <div className="p-6 text-center text-sm text-black/50">해당 폴더에 매물이 없습니다.</div>
        )}
      </div>
    </div>
  );
}

export default MapList;
