import type { Meta, StoryObj } from '@storybook/nextjs';
import Image from 'next/image';

import { Modal } from './Modal';

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
        <button onClick={openModal} className="rounded-2xl bg-[#3E3F48] px-16 py-3 text-white">
          모달 열기
        </button>

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
              <button
                className="rounded-2xl bg-[#E6E6E6] px-16 py-3 whitespace-nowrap text-[#878787]"
                onClick={closeModal}
              >
                취소
              </button>
              <button
                className="rounded-2xl bg-[#3E3F48] px-16 py-3 whitespace-nowrap text-white"
                onClick={closeModal}
              >
                삭제하기
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  },
};
