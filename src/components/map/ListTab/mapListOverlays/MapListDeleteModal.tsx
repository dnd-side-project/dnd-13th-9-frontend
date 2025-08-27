import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import TrashSVG from '@assets/trash.svg';
import { TitleM } from '@/components/ui/Typography';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  name?: string; // 선택된 엔티티 이름 (계획/폴더)
  label?: string; // 엔티티 라벨 (계획/폴더)
  confirmLabel?: string;
  loading?: boolean;
  onConfirm: () => Promise<void> | void;
};

export function MapListDeleteModal({
  isOpen,
  onClose,
  title,
  description,
  name,
  label = '계획',
  confirmLabel = '삭제하기',
  loading,
  onConfirm,
}: Props) {
  const particleEulReul = React.useMemo(() => (label === '폴더' ? '를' : '을'), [label]);

  return (
    <Modal isOpen={isOpen} closeModal={onClose}>
      <div className="w-[340px] rounded-[22px] bg-white p-4 shadow-sm">
        <div className="mt-2 flex w-full justify-center">
          <TrashSVG width={48} height={48} />
        </div>
        {name ? (
          <TitleM className="mt-3 text-center">
            <div className="text-neutral-110">
              ‘{name}’ {label}
              {particleEulReul} 정말로
            </div>
            <div className="text-neutral-110">
              <span className="text-primary-50 font-semibold">삭제</span>
              하시겠어요?
            </div>
          </TitleM>
        ) : (
          description && (
            <div className="text-neutral-80 mt-3 text-center text-sm">{description}</div>
          )
        )}
        <div className="mt-8 flex gap-2">
          <Button variant="tertiary" size="medium" className="flex-1 px-3" onClick={onClose}>
            취소
          </Button>
          <Button size="medium" className="flex-1 px-3" loading={loading} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
