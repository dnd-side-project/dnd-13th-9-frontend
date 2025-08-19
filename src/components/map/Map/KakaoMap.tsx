'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useKakaoLoader } from '@/hooks/useKakaoLoader';
import { CurrentLocationOverlay } from '@/components/map/Map/CurrentLocationOverlay';
import useModal from '@/hooks/useModal';
import { useRouter } from 'next/navigation';
import { Fab } from '@/components/ui/Fab';
import { MemoOverlay } from './MemoOverlay';

// Kakao 지도를 화면에 표시하고, 사용자의 현재 위치를 추적하여 보여주는 컴포넌트
type KakaoMapProps = {
  className?: string;
  // true면 부모 높이를 100% 채웁니다. false면 height 값을 사용합니다.
  fitParent?: boolean;
  height?: number;
};

export function KakaoMap({ className, fitParent = true, height = 560 }: KakaoMapProps) {
  // Kakao SDK 로딩 여부
  const isReady = useKakaoLoader();
  // 지도를 그릴 DOM과 지도 인스턴스 참조
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any | null>(null);
  // 오류 메시지 및 현재 위치 관련 상태
  const [error, setError] = useState<string | null>(null);
  const userPosRef = useRef<{ lat: number; lng: number } | null>(null);
  const [userPosState, setUserPosState] = useState<{ lat: number; lng: number } | null>(null);
  const [isAwayFromUser, setIsAwayFromUser] = useState<boolean>(false);
  const watchIdRef = useRef<number | null>(null);

  // mini popup
  const { isOpen, openModal, closeModal } = useModal(false);
  const router = useRouter();

  const locate = useCallback(() => {
    const win = window as unknown as { kakao: any };
    const { kakao } = win;
    if (mapInstanceRef.current && userPosRef.current) {
      const { lat, lng } = userPosRef.current;
      const pos = new kakao.maps.LatLng(lat, lng);
      // 부드럽게 이동(panTo 지원 시)
      if (typeof mapInstanceRef.current.panTo === 'function') {
        mapInstanceRef.current.panTo(pos);
      } else {
        mapInstanceRef.current.setCenter(pos);
      }
      setIsAwayFromUser(false);
      return;
    }

    if (!mapInstanceRef.current || !navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const userPosition = new kakao.maps.LatLng(coords.latitude, coords.longitude);
        mapInstanceRef.current.setCenter(userPosition);
        userPosRef.current = { lat: coords.latitude, lng: coords.longitude };

        // 오버레이는 선언형 컴포넌트로 렌더되므로 여기서는 상태만 업데이트
        setUserPosState({ lat: coords.latitude, lng: coords.longitude });
        setError(null);
        setIsAwayFromUser(false);
      },
      (err) => {
        const reason =
          err.code === 1
            ? '브라우저 위치 권한이 거부되었어요.'
            : err.code === 2
              ? '위치 정보를 사용할 수 없어요.'
              : '위치 요청이 시간 초과되었어요.';
        setError(`${reason} 브라우저 권한 설정을 확인해주세요.`);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, []);

  // 지도 초기화 및 각종 이벤트 바인딩
  useEffect(() => {
    if (!isReady || !mapRef.current) return;

    const win = window as unknown as { kakao: any };
    const { kakao } = win;

    // 기본 중심 좌표(서울시청)
    const defaultCenter = new kakao.maps.LatLng(37.5665, 126.978);
    const map = new kakao.maps.Map(mapRef.current, {
      center: defaultCenter,
      level: 5,
    });
    mapInstanceRef.current = map;

    locate();

    // 사용자가 클릭한 위치의 좌표를 콘솔에 출력
    kakao.maps.event.addListener(map, 'click', function (mouseEvent: any) {
      const latlng = mouseEvent.latLng;
      const lat = typeof latlng.getLat === 'function' ? latlng.getLat() : latlng.Ma;
      const lng = typeof latlng.getLng === 'function' ? latlng.getLng() : latlng.La;
      // eslint-disable-next-line no-console
      console.log('Clicked position:', { y: lat, x: lng });
    });

    // 사용자의 현재 위치를 실시간 구독(지도 중심은 자동 이동하지 않음)
    if (navigator.geolocation) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        ({ coords }) => {
          const lat = coords.latitude;
          const lng = coords.longitude;
          userPosRef.current = { lat, lng };
          // 버튼 즉시 이동을 위한 ref 갱신 + 오버레이 렌더링용 state 갱신
          setUserPosState({ lat, lng });
          // 지도 중심과의 거리 상태 갱신
          recalcAwayState();
        },
        () => {},
        { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
      );
    }

    // 지도 중심과 내 위치의 거리를 계산하여 버튼 색상 상태를 갱신
    const recalcAwayState = () => {
      const user = userPosRef.current;
      if (!user || !mapInstanceRef.current) return;
      const center = mapInstanceRef.current.getCenter();
      const centerLat = typeof center.getLat === 'function' ? center.getLat() : center.Ma;
      const centerLng = typeof center.getLng === 'function' ? center.getLng() : center.La;
      const d = haversineMeters(user.lat, user.lng, centerLat, centerLng);
      // 약 120m 이상 떨어지면 true
      setIsAwayFromUser(d > 120);
    };

    // 지도 이동/줌 후에도 거리 재계산
    kakao.maps.event.addListener(map, 'idle', recalcAwayState);
    // 초기 1회 계산
    recalcAwayState();

    return () => {
      if (watchIdRef.current !== null && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [isReady, locate]);

  function haversineMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const toRad = (v: number) => (v * Math.PI) / 180;
    const R = 6371000;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  const handleHomeMemo = () => {
    closeModal();
    router.push('/map/home-memo');
  };

  const handleNearMemo = () => {
    closeModal();
    router.push('/map/near-memo');
  };

  return (
    <div className={`${className ?? ''} relative`}>
      <div
        ref={mapRef}
        style={{ width: '100%', height: fitParent ? '100%' : height }}
        className="min-h-0"
      />
      {mapInstanceRef.current && (
        <CurrentLocationOverlay map={mapInstanceRef.current} position={userPosState} />
      )}
      {!isReady && (
        <div className="text-neutral-60 flex items-center justify-center py-6">
          지도를 불러오는 중...
        </div>
      )}
      {error && <div className="px-4 py-2 text-red-500">{error}</div>}

      {/* 현재 위치로 이동 버튼 */}
      <Fab
        onClick={locate}
        className="top-6 right-[18px] z-10"
        color="white"
        icon="currentLocation"
        iconColor={isAwayFromUser ? 'neutral' : 'black'}
      />

      {!isOpen && (
        <Fab
          onClick={openModal}
          className="right-[18px] bottom-12 z-10"
          icon="locationAdd"
          label="메모 하기"
        />
      )}

      <MemoOverlay
        isOpen={isOpen}
        onClose={closeModal}
        onHomeMemo={handleHomeMemo}
        onNearMemo={handleNearMemo}
        portalSelector="#main-layout"
      />
    </div>
  );
}
