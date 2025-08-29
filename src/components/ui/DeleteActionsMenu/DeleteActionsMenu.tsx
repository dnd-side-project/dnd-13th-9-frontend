import React from 'react';
import { Portal } from '@/components/ui/Portal';
import { Icon } from '@/components/ui/Icon';
import { BodyM } from '@/components/ui/Typography';

type Props = {
  isOpen: boolean;
  anchorRect: DOMRect | null;
  onClose: () => void;
  onDelete: () => void;
  deleteLabel?: string;
  className?: string;
  offsetX?: number; // +: 오른쪽, -: 왼쪽으로 이동
  offsetY?: number; // +: 아래, -: 위로 이동
  autoFlipY?: boolean; // 하단 근처일 때 위로 뒤집어 표시
};

export function DeleteActionsMenu({
  isOpen,
  anchorRect,
  onClose,
  onDelete,
  deleteLabel = '삭제하기',
  className,
  offsetX = 0,
  offsetY = 0,
  autoFlipY = true,
}: Props) {
  if (!isOpen || !anchorRect) return null;

  const MENU_WIDTH = 140;
  const MENU_HEIGHT = 45 + 12;

  let top = anchorRect.bottom + 8 + offsetY;
  const left = anchorRect.right - MENU_WIDTH + offsetX;

  if (autoFlipY && typeof window !== 'undefined') {
    const wouldOverflow = top + MENU_HEIGHT > window.innerHeight;
    if (wouldOverflow) {
      top = anchorRect.top - 8 - MENU_HEIGHT + offsetY;
    }
  }

  return (
    <Portal>
      <div className="fixed inset-0 z-[9998]" onClick={onClose} />
      <div
        className={`fixed z-[10000] rounded-xl bg-white py-3 shadow-md ${className ?? ''}`}
        style={{ top, left, width: 140 }}
      >
        <button
          type="button"
          className="hover:bg-neutral-20 flex h-[45px] w-full items-center gap-2 px-[14px] text-left"
          onClick={() => {
            onDelete();
            onClose();
          }}
        >
          <Icon name="trash" width={20} height={20} />
          <BodyM>{deleteLabel}</BodyM>
        </button>
      </div>
    </Portal>
  );
}
