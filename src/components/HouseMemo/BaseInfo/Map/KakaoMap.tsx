'use client';

import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';

interface KakaoMapProps {
  height?: string;
  x?: string | number;
  y?: string | number;
}

export interface KakaoMapRef {
  moveToCurrentLocation: () => void;
}

const KakaoMap = forwardRef<KakaoMapRef, KakaoMapProps>((props, ref) => {
  const { height = '300px', x, y } = props;
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<MapInstance | null>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    const loadKakaoMap = () => {
      kakao.maps.load(() => {
        const container = mapRef.current;
        if (!container) return;

        const centerLat = y ? Number(y) : 33.450701;
        const centerLng = x ? Number(x) : 126.570667;

        const options = {
          center: new kakao.maps.LatLng(centerLat, centerLng),
          level: 3,
        };

        const kakaoMap = new kakao.maps.Map(container, options);
        setMap(kakaoMap);

        new kakao.maps.Marker({
          map: kakaoMap,
          position: options.center,
        });
      });
    };

    if (window.kakao && window.kakao.maps) {
      loadKakaoMap();
    } else {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&autoload=false`;
      script.async = true;
      script.onload = loadKakaoMap;
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (map && x != null && y != null) {
      const newCenter = new kakao.maps.LatLng(Number(y), Number(x));
      map.setCenter(newCenter);
      if (markerRef.current) {
        markerRef.current.setPosition(newCenter);
      } else {
        markerRef.current = new kakao.maps.Marker({ map, position: newCenter });
      }
    }
  }, [map, x, y]);

  useImperativeHandle(ref, () => ({
    moveToCurrentLocation: () => {
      if (!map) return;

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          const locPosition = new kakao.maps.LatLng(lat, lon);
          map.setCenter(locPosition);

          const marker = new kakao.maps.Marker({
            map,
            position: locPosition,
          });

          const infowindow = new kakao.maps.InfoWindow({
            content: `<div style="padding:5px;font-size:12px;">현재 위치</div>`,
          });
          infowindow.open(map, marker);
        });
      } else {
        alert('이 브라우저에서는 위치 정보 사용이 불가능합니다.');
      }
    },
  }));

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height,
        borderRadius: '2%',
        zIndex: 0,
      }}
    />
  );
});

KakaoMap.displayName = 'KakaoMap';
export { KakaoMap };
