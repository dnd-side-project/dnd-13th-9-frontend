'use client';

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';

interface KakaoMapProps {
  height?: string;
}

export interface KakaoMapRef {
  moveToCurrentLocation: () => void;
}

const KakaoMap = forwardRef<KakaoMapRef, KakaoMapProps>((props, ref) => {
  const { height = '300px' } = props;
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<MapInstance | null>(null);

  useEffect(() => {
    const loadKakaoMap = () => {
      kakao.maps.load(() => {
        const container = mapRef.current;
        if (!container) return;

        const options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
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
