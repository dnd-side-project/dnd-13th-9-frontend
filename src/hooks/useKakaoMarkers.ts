'use client';

import React from 'react';
import { MapPin, type MemoType } from '@/components/ui/Marker/MapPin';

// Kakao 지도 마커 렌더링 유틸 훅
export function useKakaoMarkers(mapInstanceRef: React.MutableRefObject<any | null>) {
  // 지도에 올려둔 Kakao Marker 인스턴스 목록 (정리용)
  const markerObjsRef = React.useRef<any[]>([]);

  const renderMarkers = React.useCallback(
    // markers: { id, lat, lng, type?: MemoType, active?: boolean, nearTag?: any }
    (
      markers: Array<{
        id: string;
        lat: number | string;
        lng: number | string;
        type?: MemoType;
        active?: boolean;
        placeTag?: any;
      }>,
      onClick: (id: string) => void
    ) => {
      if (!mapInstanceRef.current) return;
      const win = window as unknown as { kakao: any };
      const { kakao } = win;
      // 기존 마커 제거
      markerObjsRef.current.forEach((m) => m.setMap(null));
      markerObjsRef.current = [];
      if (!markers || markers.length === 0) return;
      // 신규 마커 생성 및 클릭 핸들러 바인딩
      markers.forEach((m) => {
        const lat = typeof m.lat === 'string' ? parseFloat(m.lat) : m.lat;
        const lng = typeof m.lng === 'string' ? parseFloat(m.lng) : m.lng;
        const pos = new kakao.maps.LatLng(lat, lng);
        // CustomOverlay로 교체: memoType별 핀
        const content = MapPin({
          type: m.type === 'NEARBY' ? 'NEARBY' : 'PROPERTY',
          placeTag: m.placeTag,
          active: !!m.active,
          onClick: () => onClick(m.id),
        });
        const overlay = new kakao.maps.CustomOverlay({ position: pos, yAnchor: 1, content });
        overlay.setMap(mapInstanceRef.current);
        markerObjsRef.current.push(overlay);
      });
    },
    []
  );

  return { renderMarkers } as const;
}
