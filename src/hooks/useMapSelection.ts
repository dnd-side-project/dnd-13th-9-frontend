import React from 'react';
import { useMapStore } from '@/stores/useMapStore';

// 표준 placeTag 세트 (서버 스키마 기준)
const ALLOWED_NEAR_TAGS = new Set([
  'ADVANTAGE',
  'DISADVANTAGE',
  'CONVENIENCE',
  'TRANSPORTATION',
  'SECURITY',
  'NOISE',
]);
const VIEW_TO_PIN_TAG: Record<
  string,
  'ADVANTAGE' | 'DISADVANTAGE' | 'CONVENIENCE' | 'TRANSPORTATION' | 'SECURITY' | 'NOISE'
> = {
  ADVANTAGE: 'ADVANTAGE',
  DISADVANTAGE: 'DISADVANTAGE',
  CONVENIENCE: 'CONVENIENCE',
  TRANSPORTATION: 'TRANSPORTATION',
  SECURITY: 'SECURITY',
  NOISE: 'NOISE',
};

export function useMapSelection() {
  const memosInFolder = useMapStore((s) => s.memosInFolder);
  const selectedMemoId = useMapStore((s) => s.selectedMemoId);

  const markers = React.useMemo(
    () =>
      memosInFolder.map((m) => {
        // 서버 응답에 type이 없으므로 tag(=placeTag 표준화) 존재 시 NEARBY로 간주
        const type = m.tag ? 'NEARBY' : 'PROPERTY';

        let placeTag: string | undefined;
        if (type === 'NEARBY') {
          const raw = (m.tag ?? undefined) as unknown;
          const tag = typeof raw === 'string' ? raw.trim().toUpperCase() : undefined;
          const mapped = tag ? (VIEW_TO_PIN_TAG[tag] ?? undefined) : undefined;
          if (mapped && ALLOWED_NEAR_TAGS.has(mapped)) placeTag = mapped;
        }

        const lat = Number(m.lat);
        const lng = Number(m.lng);
        const valid =
          Number.isFinite(lat) &&
          Math.abs(lat) <= 90 &&
          Number.isFinite(lng) &&
          Math.abs(lng) <= 180;
        return valid
          ? {
              id: m.id,
              lat,
              lng,
              type,
              placeTag,
              active: selectedMemoId === m.id,
            }
          : null;
      }),
    [memosInFolder, selectedMemoId]
  );

  const selectedProp = React.useMemo(
    () => memosInFolder.find((m) => m.id === selectedMemoId) ?? null,
    [memosInFolder, selectedMemoId]
  );

  const filteredMarkers = React.useMemo(
    () => (Array.isArray(markers) ? (markers.filter(Boolean) as any) : []),
    [markers]
  );

  return { markers: filteredMarkers, selectedProp } as const;
}
