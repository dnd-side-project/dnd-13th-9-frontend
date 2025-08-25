'use client';

import { Portal } from '@/components/ui/Portal/Portal';
import { Fab } from '@/components/ui/Fab';
import { Icon } from '@/components/ui/Icon/Icon';
import { BodyM } from '@/components/ui/Typography/Typography';
import { useRouter } from 'next/navigation';

type MemoOverlayProps = {
  isOpen: boolean;
  onClose?: () => void;
  onHomeMemo?: () => void;
  onNearMemo?: () => void;
  portalSelector?: string;
};

export function MemoOverlay({
  isOpen,
  onClose,
  onHomeMemo,
  onNearMemo,
  portalSelector,
}: MemoOverlayProps) {
  const router = useRouter();
  if (!isOpen) return null;

  const handleHome = () => {
    if (onHomeMemo) onHomeMemo();
    else {
      onClose?.();
      router.push('/map/house-memo');
    }
  };

  const handleNear = () => {
    if (onNearMemo) onNearMemo();
    else {
      onClose?.();
      router.push('/map/nearby-memo');
    }
  };

  return (
    <Portal selector={portalSelector}>
      <div
        className="absolute inset-0 z-30"
        style={{ backgroundColor: 'rgba(1, 1, 1, 0.6)' }}
        onClick={onClose}
      />

      {/* Popup card */}
      <div className="absolute right-4 bottom-26 z-40">
        <div className="min-w-[140px] rounded-xl bg-white py-3 shadow-md">
          <button
            type="button"
            onClick={handleHome}
            className="hover:bg-neutral-20 flex w-full items-center gap-1 rounded-md px-[14px] py-3"
          >
            <Icon name="house" size={20} color="primary" />
            <BodyM>매물 정보 기록</BodyM>
          </button>
          <button
            type="button"
            onClick={handleNear}
            className="hover:bg-neutral-20 flex w-full items-center gap-1 rounded-md px-[14px] py-3"
          >
            <Icon name="favorite" size={20} color="secondary" />
            <BodyM>주변 장소 메모</BodyM>
          </button>
        </div>
      </div>

      {/* Close FAB (X) */}
      <Fab onClick={onClose} className="right-[18px] bottom-12 z-40" icon="close" color="primary" />
    </Portal>
  );
}
