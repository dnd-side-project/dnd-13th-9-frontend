'use client';

import { useKakaoLoader } from '@/hooks/useKakaoLoader';
import React from 'react';

export type KakaoMapCore = {
  isReady: boolean;
  mapRef: React.MutableRefObject<HTMLDivElement | null>;
  mapInstanceRef: React.MutableRefObject<any | null>;
  userPosState: { lat: number; lng: number } | null;
  isAwayFromUser: boolean;
  permissionDenied: boolean;
  locate: () => void;
};

type UseKakaoMapCoreOptions = {
  /** SDK 준비 시 사용자 위치로 자동 이동 여부 (기본: true) */
  autoLocateOnReady?: boolean;
};

export function useKakaoMapCore(options?: UseKakaoMapCoreOptions): KakaoMapCore {
  const { autoLocateOnReady = true } = options ?? {};
  // Kakao SDK 로드 여부 확인 훅
  const isReady = useKakaoLoader();
  const mapRef = React.useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = React.useRef<any | null>(null);
  const userPosRef = React.useRef<{ lat: number; lng: number } | null>(null);
  const watchIdRef = React.useRef<number | null>(null);

  const [userPosState, setUserPosState] = React.useState<{ lat: number; lng: number } | null>(null);
  const [isAwayFromUser, setIsAwayFromUser] = React.useState(false);
  const [permissionDenied, setPermissionDenied] = React.useState(false);

  // 현재 위치로 지도를 이동시키는 함수
  // - 캐시된 사용자 좌표가 있으면 부드럽게 이동
  // - 없으면 Geolocation API로 좌표를 받아와 중심 이동
  const locate = React.useCallback(() => {
    const win = window as unknown as { kakao: any };
    const { kakao } = win;
    if (mapInstanceRef.current && userPosRef.current) {
      const { lat, lng } = userPosRef.current;
      const pos = new kakao.maps.LatLng(lat, lng);
      if (typeof mapInstanceRef.current.panTo === 'function') mapInstanceRef.current.panTo(pos);
      else mapInstanceRef.current.setCenter(pos);
      setIsAwayFromUser(false);
      return;
    }
    if (!mapInstanceRef.current || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const userPosition = new kakao.maps.LatLng(coords.latitude, coords.longitude);
        mapInstanceRef.current!.setCenter(userPosition);
        userPosRef.current = { lat: coords.latitude, lng: coords.longitude };
        setUserPosState({ lat: coords.latitude, lng: coords.longitude });
        setIsAwayFromUser(false);
        setPermissionDenied(false);
      },
      (err) => {
        // 권한 거부/위치 사용 불가 시 1회 알림
        if (!permissionDenied)
          alert('위치권한 또는 위치 사용이 거부되었습니다. 설정을 확인해주세요.');
        setPermissionDenied(true);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, [permissionDenied]);

  // 지도 초기화 및 현재 위치 추적, 중심과의 거리 상태 갱신
  React.useEffect(() => {
    if (!isReady || !mapRef.current) return;
    const win = window as unknown as { kakao: any };
    const { kakao } = win;
    const defaultCenter = new kakao.maps.LatLng(37.5665, 126.978);
    const map = new kakao.maps.Map(mapRef.current, { center: defaultCenter, level: 5 });
    mapInstanceRef.current = map;

    if (autoLocateOnReady) locate();

    // 지도 중심과 내 위치의 거리를 재계산하여 버튼 색상 등에 활용
    const recalcAwayState = () => {
      const user = userPosRef.current;
      if (!user || !mapInstanceRef.current) return;
      const center = mapInstanceRef.current.getCenter();
      const centerLat = typeof center.getLat === 'function' ? center.getLat() : center.Ma;
      const centerLng = typeof center.getLng === 'function' ? center.getLng() : center.La;
      const d = haversineMeters(user.lat, user.lng, centerLat, centerLng);
      setIsAwayFromUser(d > 120);
    };

    if (navigator.geolocation) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        ({ coords }) => {
          const lat = coords.latitude;
          const lng = coords.longitude;
          userPosRef.current = { lat, lng };
          setUserPosState({ lat, lng });
          recalcAwayState();
        },
        () => {},
        { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
      );
    }

    kakao.maps.event.addListener(map, 'idle', recalcAwayState);
    recalcAwayState();

    return () => {
      if (watchIdRef.current !== null && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [isReady, locate, autoLocateOnReady]);

  return {
    isReady,
    mapRef,
    mapInstanceRef,
    userPosState,
    isAwayFromUser,
    permissionDenied,
    locate,
  };
}

// 두 좌표 간 대략적인 직선거리(미터)를 계산
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
