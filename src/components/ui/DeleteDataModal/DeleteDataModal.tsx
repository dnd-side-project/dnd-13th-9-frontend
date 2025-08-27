import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  onConfirm?: () => void;
};

export function DeleteDataModal({ isOpen, closeModal, onConfirm }: Props) {
  const router = useRouter();

  const handleDelete = () => {
    closeModal();
    if (onConfirm) {
      onConfirm();
    }
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="flex flex-col items-center gap-2 rounded-2xl bg-white p-5 shadow-sm">
        <Image src="/assets/trash.svg" alt="alert 아이콘" width={60} height={60} />
        <div className="flex flex-col items-center justify-center pb-4">
          <span className="text-xl font-semibold">작성 중인 메모를</span>
          <div className="flex flex-row">
            <span className="text-xl font-semibold text-[#669AFF]">삭제</span>
            <span className="text-xl font-semibold">하고 나가시겠어요?</span>
          </div>
        </div>

        <div className="flex flex-row gap-2">
          <Button onClick={closeModal} variant="tertiary" size="medium">
            취소
          </Button>
          <Button onClick={handleDelete} size="medium">
            삭제하기
          </Button>
        </div>
      </div>
    </Modal>
  );
}
