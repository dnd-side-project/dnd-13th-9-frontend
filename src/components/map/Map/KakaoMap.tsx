'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useKakaoMapCore } from '@/hooks/useKakaoMapCore';
import { CurrentLocationOverlay } from '../MapTab/CurrentLocationOverlay';
import { MemoOverlay } from './MemoOverlay';
import useModal from '@/hooks/useModal';
import { Fab } from '@/components/ui/Fab';
import { useMapSelection } from '@/hooks/useMapSelection';
import { useMapStore } from '@/stores/useMapStore';
import { useKakaoMarkers } from '@/hooks/useKakaoMarkers';
import { Loading } from '@/components/ui/Loading';

type KakaoMapProps = {
  center?: { lat: number; lng: number } | null;
  markers?: Array<{ id: string; lat: number | string; lng: number | string }>;
  onMarkerClick?: (id: string) => void;
  /** 탭 전환 등 외부 트리거로 최신 매물에 1회 포커싱하기 위한 키 */
  focusKey?: number;
};

export function KakaoMap({ center, markers, onMarkerClick, focusKey }: KakaoMapProps) {
  // 지도/현재위치/권한 등 코어 로직은 훅으로 관리
  const {
    isReady,
    mapRef,
    mapInstanceRef,
    userPosState,
    isAwayFromUser,
    permissionDenied,
    locate,
  } = useKakaoMapCore({ autoLocateOnReady: false });

  // mini popup
  const { isOpen, openModal, closeModal } = useModal(false);
  const { markers: storeMarkers, selectedProp } = useMapSelection();
  const effectiveMarkers = markers ?? storeMarkers;
  const effectiveCenter =
    center ?? (selectedProp ? { lat: selectedProp.lat, lng: selectedProp.lng } : null);
  const { renderMarkers } = useKakaoMarkers(mapInstanceRef);
  const setSelectedMemoId = useMapStore((s) => s.setSelectedMemoId);
  const selectedMemoId = useMapStore((s) => s.selectedMemoId);
  const currentFolderId = useMapStore((s) => s.folderId);
  const suppressClearRef = useRef(false);
  const [folderChangeKey, setFolderChangeKey] = useState(0);

  const panTo = React.useCallback(
    (lat: number | string, lng: number | string) => {
      if (!mapInstanceRef.current) return;
      const latNum = typeof lat === 'string' ? parseFloat(lat) : lat;
      const lngNum = typeof lng === 'string' ? parseFloat(lng) : lng;
      if (!Number.isFinite(latNum) || !Number.isFinite(lngNum)) return;
      const win = window as unknown as { kakao: any };
      const { kakao } = win;
      const pos = new kakao.maps.LatLng(latNum, lngNum);
      if (typeof mapInstanceRef.current.panTo === 'function') {
        mapInstanceRef.current.panTo(pos);
      } else {
        mapInstanceRef.current.setCenter(pos);
      }
    },
    [mapInstanceRef]
  );

  // 폴더가 변경될 때마다 키 증가 (되돌아와도 다시 포커싱 유도)
  useEffect(() => {
    setFolderChangeKey((k) => k + 1);
  }, [currentFolderId]);

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

  const handleMarkerClick =
    onMarkerClick ??
    ((id: string) => {
      suppressClearRef.current = true;
      setSelectedMemoId(id);
      // 클릭한 마커로 포커싱
      const m = effectiveMarkers?.find?.(
        (mk: { id: string; lat: number | string; lng: number | string }) => mk.id === id
      );
      if (m) panTo(m.lat, m.lng);
    });

  // 외부 마커 렌더링 (훅 사용)
  useEffect(() => {
    if (!effectiveMarkers) return;
    renderMarkers(effectiveMarkers, handleMarkerClick);
  }, [effectiveMarkers, handleMarkerClick, renderMarkers]);

  // 폴더 전환 시마다 최신 매물로 1회 포커싱 (선택된 메모가 있으면 스킵)
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const latest =
      effectiveMarkers && effectiveMarkers.length > 0
        ? effectiveMarkers[effectiveMarkers.length - 1]
        : null;
    if (!latest) {
      // 매물이 없으면 현재 위치로 이동
      locate();
      return;
    }
    if (!selectedMemoId) panTo(latest.lat, latest.lng);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderChangeKey]);

  // 외부에서 포커싱을 명시적으로 요청한 경우(탭 전환 시 등) 최신 매물로 포커싱
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    if (focusKey === undefined) return;
    const latest =
      effectiveMarkers && effectiveMarkers.length > 0
        ? effectiveMarkers[effectiveMarkers.length - 1]
        : null;
    if (!latest) {
      // 매물이 없으면 현재 위치로 이동
      locate();
      return;
    }
    if (!selectedMemoId) panTo(latest.lat, latest.lng);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusKey]);

  // 지도 빈 공간 클릭 시 선택 해제 (마커 클릭으로 들어온 경우 한 번 무시)
  useEffect(() => {
    if (!isReady || !mapInstanceRef.current) return;
    const win = window as unknown as { kakao: any };
    const { kakao } = win;
    const map = mapInstanceRef.current;
    const clearSelection = () => {
      if (suppressClearRef.current) {
        suppressClearRef.current = false;
        return;
      }
      setSelectedMemoId(null);
    };
    kakao.maps.event.addListener(map, 'click', clearSelection);
    return () => {
      kakao.maps.event.removeListener(map, 'click', clearSelection);
    };
  }, [isReady, setSelectedMemoId, mapInstanceRef]);

  return (
    <div className={`relative flex-1 px-0`} onClick={() => setSelectedMemoId(null)}>
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
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/60 backdrop-blur-[2px]">
          <Loading size="large" />
        </div>
      )}

      <Fab
        icon="currentLocation"
        onClick={() => {
          setSelectedMemoId(null);
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
