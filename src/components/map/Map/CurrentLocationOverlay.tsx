'use client';

import { useEffect, useRef } from 'react';

type Props = {
  map: any | null;
  position: { lat: number; lng: number } | null;
};

function ensurePulseStyleInstalled() {
  if (document.getElementById('kakao-pulse-style')) return;
  const style = document.createElement('style');
  style.id = 'kakao-pulse-style';
  style.textContent = `
    @keyframes kakao-pulse {
      0% { transform: translate(-50%, -50%) scale(0.6); opacity: 0.7; }
      70% { transform: translate(-50%, -50%) scale(1.6); opacity: 0; }
      100% { transform: translate(-50%, -50%) scale(1.6); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

function createContent(): HTMLDivElement {
  const wrap = document.createElement('div');
  wrap.style.position = 'relative';
  wrap.style.width = '24px';
  wrap.style.height = '24px';
  wrap.style.transform = 'translate(-50%, -50%)';

  const ring = document.createElement('div');
  ring.style.position = 'absolute';
  ring.style.left = '50%';
  ring.style.top = '50%';
  ring.style.width = '32px';
  ring.style.height = '32px';
  ring.style.borderRadius = '9999px';
  ring.style.background = 'rgba(59,130,246,0.35)';
  ring.style.animation = 'kakao-pulse 1.6s ease-out infinite';
  ring.style.transform = 'translate(-50%, -50%)';

  const core = document.createElement('div');
  core.style.position = 'absolute';
  core.style.left = '50%';
  core.style.top = '50%';
  core.style.width = '16px';
  core.style.height = '16px';
  core.style.borderRadius = '9999px';
  core.style.background = '#ff6648';
  core.style.border = '2px solid white';
  core.style.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';
  core.style.transform = 'translate(-50%, -50%)';

  wrap.appendChild(ring);
  wrap.appendChild(core);
  return wrap;
}

export function CurrentLocationOverlay({ map, position }: Props) {
  const overlayRef = useRef<any | null>(null);

  // Create overlay once when map is ready
  useEffect(() => {
    if (!map || overlayRef.current) return;
    const { kakao } = window as any;
    ensurePulseStyleInstalled();
    const content = createContent();
    overlayRef.current = new kakao.maps.CustomOverlay({
      position: position ? new kakao.maps.LatLng(position.lat, position.lng) : undefined,
      content,
      yAnchor: 1,
    });
    overlayRef.current.setMap(map);
    return () => {
      if (overlayRef.current) {
        overlayRef.current.setMap(null);
        overlayRef.current = null;
      }
    };
  }, [map]);

  // Update position
  useEffect(() => {
    if (!map || !overlayRef.current || !position) return;
    const { kakao } = window as any;
    overlayRef.current.setPosition(new kakao.maps.LatLng(position.lat, position.lng));
  }, [map, position]);

  return null;
}
