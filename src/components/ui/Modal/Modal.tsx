import React from 'react';

import { Portal } from '../Portal';

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
};

export function Modal({ isOpen, closeModal, children }: Props) {
  return (
    <Portal isOpen={isOpen}>
      <div className="absolute inset-0 z-30 bg-black opacity-50" onClick={closeModal} />
      <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center">
        <div className="pointer-events-auto rounded-2xl bg-white">{children}</div>
      </div>
    </Portal>
  );
}
