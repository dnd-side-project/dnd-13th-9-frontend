import React from 'react';
import { useMapStore } from '@/stores/useMapStore';

export function useMapSelection() {
  const propsInFolder = useMapStore((s) => s.propsInFolder);
  const selectedPropId = useMapStore((s) => s.selectedPropId);

  const markers = React.useMemo(
    () => propsInFolder.map((p) => ({ id: p.propertyId, lat: p.latitude, lng: p.longitude })),
    [propsInFolder]
  );

  const selectedProp = React.useMemo(
    () => propsInFolder.find((p) => p.propertyId === selectedPropId) ?? null,
    [propsInFolder, selectedPropId]
  );

  return { markers, selectedProp } as const;
}
