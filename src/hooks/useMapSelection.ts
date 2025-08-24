import React from 'react';
import { useMapStore } from '@/stores/useMapStore';

const ALLOWED_NEAR_TAGS = new Set(['BAD', 'CONVENIENCE', 'GOOD', 'NOISE', 'SECURITY', 'TRAFFIC']);

export function useMapSelection() {
  const propsInFolder = useMapStore((s) => s.propsInFolder);
  const selectedPropId = useMapStore((s) => s.selectedPropId);

  const markers = React.useMemo(
    () =>
      propsInFolder.map((p) => {
        const type = (p as any).memoType ?? 'PROPERTY';

        let nearTag: string | undefined;
        if (type === 'NEARBY') {
          const raw = ((p as any).nearTag ?? (p as any).placeTag) as unknown;
          const tag = typeof raw === 'string' ? raw.trim().toUpperCase() : undefined;
          if (tag && ALLOWED_NEAR_TAGS.has(tag)) nearTag = tag;
        }

        return {
          id: p.propertyId,
          lat: p.latitude,
          lng: p.longitude,
          type,
          nearTag,
          active: selectedPropId === p.propertyId,
        };
      }),
    [propsInFolder, selectedPropId]
  );

  const selectedProp = React.useMemo(
    () => propsInFolder.find((p) => p.propertyId === selectedPropId) ?? null,
    [propsInFolder, selectedPropId]
  );

  return { markers, selectedProp } as const;
}
