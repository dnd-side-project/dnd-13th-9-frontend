'use client';

import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { MapPin } from '@/components/ui/Marker';

interface KakaoMapProps {
  height?: string;
  x?: string | number | undefined;
  y?: string | number | undefined;
  lat?: number;
  lng?: number;
  type?: 'PROPERTY' | 'NEARBY';
}

export interface KakaoMapRef {
  moveToCurrentLocation: () => Promise<{
    address: string;
    placeName: string;
    lng: number;
    lat: number;
  } | null>;
}

const KakaoMap = forwardRef<KakaoMapRef, KakaoMapProps>((props, ref) => {
  const { height = '300px', x, y, lat, lng } = props;
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<MapInstance | null>(null);
  const markerRef = useRef<any>(null);
  const mapPinRef = useRef<HTMLElement | null>(null);

  const getCoordinates = () => {
    if (lat != null && lng != null) {
      return { lat: Number(lat), lng: Number(lng) };
    }
    if (x != null && y != null && x !== '' && y !== '') {
      return { lat: Number(y), lng: Number(x) };
    }
    return null;
  };

  useEffect(() => {
    const loadKakaoMap = () => {
      kakao.maps.load(() => {
        const container = mapRef.current;
        if (!container) return;

        const coordinates = getCoordinates();
        let centerLat, centerLng;

        if (coordinates) {
          centerLat = coordinates.lat;
          centerLng = coordinates.lng;
        } else {
          centerLat = 37.5665;
          centerLng = 126.978;
        }

        const options = {
          center: new kakao.maps.LatLng(centerLat, centerLng),
          level: 3,
        };

        const kakaoMap = new kakao.maps.Map(container, options);
        setMap(kakaoMap);

        const pinPosition = coordinates
          ? new kakao.maps.LatLng(coordinates.lat, coordinates.lng)
          : options.center;

        const mapPin = MapPin({ type: props.type || 'PROPERTY', size: 48 });
        mapPinRef.current = mapPin;

        const overlay = new kakao.maps.CustomOverlay({
          content: mapPin as HTMLElement,
          position: pinPosition,
          xAnchor: 0.5,
          yAnchor: 0.8,
          zIndex: 1,
        });
        overlay.setMap(kakaoMap);
        markerRef.current = overlay;
      });
    };

    if (window.kakao && window.kakao.maps) {
      loadKakaoMap();
    } else {
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&autoload=false&libraries=services`;
      script.async = true;
      script.onload = loadKakaoMap;
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (map) {
      const coordinates = getCoordinates();
      if (coordinates) {
        const newCenter = new kakao.maps.LatLng(coordinates.lat, coordinates.lng);
        map.setCenter(newCenter);

        if (markerRef.current) {
          markerRef.current.setMap(null);
        }
        if (mapPinRef.current) {
          mapPinRef.current.remove();
        }

        const mapPin = MapPin({ type: 'PROPERTY', size: 48 });
        mapPinRef.current = mapPin;

        const overlay = new kakao.maps.CustomOverlay({
          content: mapPin as HTMLElement,
          position: newCenter,
          xAnchor: 0.5,
          yAnchor: 0.8,
          zIndex: 1,
        });
        overlay.setMap(map);
        markerRef.current = overlay;
      }
    }
  }, [map, lat, lng, x, y]);

  useImperativeHandle(ref, () => ({
    moveToCurrentLocation: async () => {
      if (!map) return null;

      if (navigator.geolocation) {
        return new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const locPosition = new kakao.maps.LatLng(lat, lon);
            map.setCenter(locPosition);

            if (markerRef.current) {
              markerRef.current.setMap(null);
            }
            if (mapPinRef.current) {
              mapPinRef.current.remove();
            }

            const mapPin = MapPin({ type: 'PROPERTY', size: 48 });
            mapPinRef.current = mapPin;

            const overlay = new kakao.maps.CustomOverlay({
              content: mapPin as HTMLElement,
              position: locPosition,
              xAnchor: 0.5,
              yAnchor: 0.8,
              zIndex: 1,
            });
            overlay.setMap(map);
            markerRef.current = overlay;

            try {
              const response = await fetch(
                `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}`,
                {
                  headers: {
                    Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY || process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}`,
                  },
                }
              );

              if (response.ok) {
                const data = await response.json();
                if (data.documents && data.documents.length > 0) {
                  const address = data.documents[0].address.address_name;
                  const placeName =
                    data.documents[0].address.region_3depth_h_name ||
                    data.documents[0].address.region_2depth_name ||
                    data.documents[0].address.region_1depth_name;

                  resolve({
                    address,
                    placeName,
                    lng: lon,
                    lat: lat,
                  });
                } else {
                  resolve({
                    address: `위도: ${lat.toFixed(6)}, 경도: ${lon.toFixed(6)}`,
                    placeName: '현재 위치',
                    lng: lon,
                    lat: lat,
                  });
                }
              } else {
                resolve({
                  address: `위도: ${lat.toFixed(6)}, 경도: ${lon.toFixed(6)}`,
                  placeName: '현재 위치',
                  lng: lon,
                  lat: lat,
                });
              }
            } catch (error) {
              console.error('Address lookup error:', error);
              resolve({
                address: `위도: ${lat.toFixed(6)}, 경도: ${lon.toFixed(6)}`,
                placeName: '현재 위치',
                lng: lon,
                lat: lat,
              });
            }
          });
        });
      } else {
        alert('이 브라우저에서는 위치 정보 사용이 불가능합니다.');
        return null;
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

export { KakaoMap };
