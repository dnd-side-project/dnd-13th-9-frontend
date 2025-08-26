import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ChecklistGuideModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export function ChecklistGuideModal({ isOpen, closeModal }: ChecklistGuideModalProps) {
  const router = useRouter();

  const handleGoToChecklist = () => {
    closeModal();
    router.push('/checklist');
  };

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="flex flex-col items-center gap-2 rounded-2xl bg-white p-5 shadow-sm">
        <Image src="/assets/ico-alert.svg" alt="alert 아이콘" width={60} height={60} />
        <div className="flex flex-col items-center justify-center pb-4">
          <span className="text-xl font-semibold">매물 정보 기록 전에</span>
          <div className="flex flex-row">
            <span className="text-xl font-semibold text-[#669AFF]">체크리스트 생성</span>
            <span className="text-xl font-semibold">을 할 수 있어요!</span>
          </div>
        </div>

        <div className="flex flex-row gap-2">
          <Button onClick={closeModal} variant="tertiary" size="medium">
            취소
          </Button>
          <Button onClick={handleGoToChecklist} size="medium">
            바로 가기
          </Button>
        </div>
      </div>
    </Modal>
  );
}
