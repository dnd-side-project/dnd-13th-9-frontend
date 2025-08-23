'use client';

import React, { useEffect } from 'react';
import { useKakaoMapCore } from '@/hooks/useKakaoMapCore';
import { CurrentLocationOverlay } from './overlays/CurrentLocationOverlay';
import { MemoOverlay } from './overlays/MemoOverlay';
import useModal from '@/hooks/useModal';
import { Fab } from '@/components/ui/Fab';
import { useMapSelection } from '@/hooks/useMapSelection';
import { useMapStore } from '@/stores/useMapStore';
import { useKakaoMarkers } from '@/hooks/useKakaoMarkers';

type KakaoMapProps = {
  center?: { lat: number; lng: number } | null;
  markers?: Array<{ id: number; lat: number; lng: number }>; // 최소 스펙
  onMarkerClick?: (id: number) => void;
};

export function KakaoMap({ center, markers, onMarkerClick }: KakaoMapProps) {
  // 지도/현재위치/권한 등 코어 로직은 훅으로 관리
  const {
    isReady,
    mapRef,
    mapInstanceRef,
    userPosState,
    isAwayFromUser,
    permissionDenied,
    locate,
  } = useKakaoMapCore();

  // mini popup
  const { isOpen, openModal, closeModal } = useModal(false);
  const { markers: storeMarkers, selectedProp } = useMapSelection();
  const effectiveMarkers = markers ?? storeMarkers;
  const effectiveCenter =
    center ?? (selectedProp ? { lat: selectedProp.latitude, lng: selectedProp.longitude } : null);
  const { renderMarkers } = useKakaoMarkers(mapInstanceRef);
  const setSelectedPropId = useMapStore((s) => s.setSelectedPropId);

  // 외부에서 전달되는 center가 변경되면 지도 중심 이동
  useEffect(() => {
    if (!mapInstanceRef.current || !effectiveCenter) return;
    const win = window as unknown as { kakao: any };
    const { kakao } = win;
    const pos = new kakao.maps.LatLng(effectiveCenter.lat, effectiveCenter.lng);
    if (typeof mapInstanceRef.current.panTo === 'function') {
      mapInstanceRef.current.panTo(pos);
    } else {
      mapInstanceRef.current.setCenter(pos);
    }
  }, [effectiveCenter]);

  const handleMarkerClick = onMarkerClick ?? ((id: number) => setSelectedPropId(id));

  // 외부 마커 렌더링 (훅 사용)
  useEffect(() => {
    if (!effectiveMarkers) return;
    renderMarkers(effectiveMarkers, handleMarkerClick);
  }, [effectiveMarkers, handleMarkerClick, renderMarkers]);

  return (
    <div className={`relative flex-1 px-0`}>
      <div ref={mapRef} className="h-full w-full" />
      {mapInstanceRef.current && (
        <CurrentLocationOverlay
          map={mapInstanceRef.current}
          position={userPosState}
          onClick={() => {
            if (permissionDenied) {
              alert('위치권한이 거부되었어요.\n브라우저 권한 설정을 확인해주세요.');
            } else {
              locate();
            }
          }}
        />
      )}
      {!isReady && (
        <div className="text-neutral-60 flex items-center justify-center py-6">
          지도를 불러오는 중...
        </div>
      )}

      <Fab
        icon="currentLocation"
        onClick={() => {
          setSelectedPropId(null);
          locate();
        }}
        className="top-6 right-[18px] z-10"
        color="white"
        iconColor={isAwayFromUser ? 'neutral' : 'primary'}
      />

      {!isOpen && (
        <Fab
          label="메모 하기"
          icon="locationAdd"
          onClick={openModal}
          className="right-[18px] bottom-12 z-10"
        />
      )}

      <MemoOverlay isOpen={isOpen} onClose={closeModal} portalSelector="#main-layout" />
    </div>
  );
}
