import type { Meta, StoryObj } from '@storybook/nextjs';
import Image from 'next/image';

import { Modal } from './Modal';
import { Button } from '../Button';

import useModal from '@/hooks/useModal';

export default {
  title: 'components/common/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export const Basic: StoryObj<typeof Modal> = {
  args: { isOpen: false },
  render: (args) => {
    const { isOpen, openModal, closeModal } = useModal(args.isOpen);

    return (
      <div className="flex flex-col items-center gap-2">
        <Button onClick={openModal} variant="primary" size="large">
          모달 열기
        </Button>

        <Modal {...args} isOpen={isOpen} closeModal={closeModal}>
          <div className="flex flex-col items-center gap-2 rounded-2xl bg-white p-5 shadow-sm">
            <Image src="/assets/ico-alert.svg" alt="alert 아이콘" width={60} height={60} />
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
              <Button onClick={closeModal} size="medium">
                삭제하기
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  },
};
