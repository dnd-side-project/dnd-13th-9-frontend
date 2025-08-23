'use client';

import React from 'react';

// Kakao 지도 마커 렌더링 유틸 훅
export function useKakaoMarkers(mapInstanceRef: React.MutableRefObject<any | null>) {
  // 지도에 올려둔 Kakao Marker 인스턴스 목록 (정리용)
  const markerObjsRef = React.useRef<any[]>([]);

  const renderMarkers = React.useCallback(
    // markers: { id, lat, lng } 최소 스펙
    // onClick: 마커 클릭 시 호출될 콜백 (id 전달)
    (markers: Array<{ id: number; lat: number; lng: number }>, onClick: (id: number) => void) => {
      if (!mapInstanceRef.current) return;
      const win = window as unknown as { kakao: any };
      const { kakao } = win;
      // 기존 마커 제거
      markerObjsRef.current.forEach((m) => m.setMap(null));
      markerObjsRef.current = [];
      if (!markers || markers.length === 0) return;
      // 신규 마커 생성 및 클릭 핸들러 바인딩
      markers.forEach((m) => {
        const pos = new kakao.maps.LatLng(m.lat, m.lng);
        const marker = new kakao.maps.Marker({ position: pos });
        marker.setMap(mapInstanceRef.current);
        kakao.maps.event.addListener(marker, 'click', () => onClick(m.id));
        markerObjsRef.current.push(marker);
      });
    },
    []
  );

  return { renderMarkers } as const;
}
