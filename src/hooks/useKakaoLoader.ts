'use client';

import { useEffect, useState } from 'react';

/**
 * Loads Kakao Maps JavaScript SDK once on the client.
 * Exposes a boolean indicating whether `kakao.maps` is ready.
 */
export function useKakaoLoader(): boolean {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const win = window as unknown as { kakao?: any };

    // Already loaded
    if (win.kakao && win.kakao.maps) {
      setIsReady(true);
      return;
    }

    const appKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;
    if (!appKey) {
      console.error('Missing env: NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY');
      setError('환경변수 NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY가 없습니다.');
      return;
    }

    // Prevent injecting multiple script tags
    const existing = document.querySelector(
      'script[data-kakao-sdk="maps"]'
    ) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener('load', () => {
        if (win.kakao && win.kakao.maps) {
          win.kakao.maps.load(() => setIsReady(true));
        }
      });
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.dataset.kakaoSdk = 'maps';
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`;
    script.addEventListener('load', () => {
      if (!win.kakao) return;
      win.kakao.maps.load(() => setIsReady(true));
    });
    script.addEventListener('error', () => {
      console.error('Failed to load Kakao Maps SDK');
      setError('카카오 지도 SDK 로드에 실패했습니다. 도메인/앱키/네트워크를 확인하세요.');
      // 실패 시 사용자에게 재시도/메인 이동을 확인받습니다.
      const retry = window.confirm('지도 로드에 실패했어요. 재시도 하시겠어요?');
      if (retry) {
        window.location.reload();
      } else {
        window.location.href = '/';
      }
    });

    document.head.appendChild(script);
  }, []);

  return isReady;
}

/**
 * 에러 상태를 함께 제공하는 버전. isReady가 false이면서 error가 세팅되면 로드 실패.
 */
export function useKakaoLoaderStatus(): { isReady: boolean; error: string | null } {
  const [ready, setReady] = useState<boolean>(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const win = window as any;

    const ensure = () => {
      if (win.kakao && win.kakao.maps) {
        win.kakao.maps.load(() => setReady(true));
        return true;
      }
      return false;
    };

    if (ensure()) return;

    const appKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;
    if (!appKey) {
      setErr('환경변수 NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY가 없습니다.');
      return;
    }

    let script = document.querySelector(
      'script[data-kakao-sdk="maps"]'
    ) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.dataset.kakaoSdk = 'maps';
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`;
      document.head.appendChild(script);
    }

    const onLoad = () => {
      if (win.kakao && win.kakao.maps) {
        win.kakao.maps.load(() => setReady(true));
      } else {
        setErr('SDK가 로드되었지만 kakao.maps가 없습니다.');
      }
    };
    const onError = () => setErr('카카오 지도 SDK 로드 실패(도메인/앱키/쿼터 확인)');
    const onErrorWithConfirm = () => {
      setErr('카카오 지도 SDK 로드 실패(도메인/앱키/쿼터 확인)');
      const retry = window.confirm('지도 로드에 실패했어요. 재시도 하시겠어요?');
      if (retry) {
        window.location.reload();
      } else {
        window.location.href = '/';
      }
    };

    script!.addEventListener('load', onLoad);
    script!.addEventListener('error', onErrorWithConfirm);

    // 6초 내 준비 안 되면 안내 메시지 세팅
    const t = window.setTimeout(() => {
      if (!ready) setErr('지도를 불러오지 못했습니다. 콘솔 오류를 확인해 주세요.');
    }, 6000);

    return () => {
      script!.removeEventListener('load', onLoad);
      script!.removeEventListener('error', onErrorWithConfirm);
      window.clearTimeout(t);
    };
  }, []);

  return { isReady: ready, error: err };
}
