import React from 'react';
import { Portal } from '@/components/ui/Portal';
import { Icon } from '@/components/ui/Icon';
import { BodyM } from '@/components/ui/Typography';

type Props = {
  isOpen: boolean;
  anchorRect: DOMRect | null;
  onClose: () => void;
  onRename: () => void;
  onDelete: () => void;
  renameLabel?: string;
  deleteLabel?: string;
  className?: string;
  offsetX?: number; // +: 오른쪽, -: 왼쪽으로 이동
  offsetY?: number; // +: 아래, -: 위로 이동
  autoFlipY?: boolean; // 하단 근처일 때 위로 뒤집어 표시
};

// 공통 액션 메뉴(계획/폴더 공용): 140 x 45 버튼 2개, Portal 렌더
export function MapListActionsMenu({
  isOpen,
  anchorRect,
  onClose,
  onRename,
  onDelete,
  renameLabel = '이름 수정',
  deleteLabel = '삭제하기',
  className,
  offsetX = 0,
  offsetY = 0,
  autoFlipY = true,
}: Props) {
  if (!isOpen || !anchorRect) return null;

  const MENU_WIDTH = 140;
  const MENU_HEIGHT = 45 * 2 + 12; // 버튼 2개 + py-3

  let top = anchorRect.bottom + 8 + offsetY;
  const left = anchorRect.right - MENU_WIDTH + offsetX;

  if (autoFlipY && typeof window !== 'undefined') {
    const wouldOverflow = top + MENU_HEIGHT > window.innerHeight;
    if (wouldOverflow) {
      top = anchorRect.top - 8 - MENU_HEIGHT + offsetY; // 위로 뒤집어서 표시
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
            onRename();
            onClose();
          }}
        >
          <Icon name="edit" width={20} height={20} />
          <BodyM>{renameLabel}</BodyM>
        </button>
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
