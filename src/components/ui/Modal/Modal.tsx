import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Portal } from '../Portal';
import { OVERLAY_MOTION } from '@/utils/style/animations/motionConstants';

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
};

export function Modal({ isOpen, closeModal, children }: Props) {
  return (
    <Portal isOpen={isOpen}>
      <AnimatePresence>
        <>
          <motion.div
            className="absolute inset-0 z-30 bg-black/50"
            onClick={closeModal}
            variants={OVERLAY_MOTION}
            initial={'initial'}
            animate={'animate'}
            exit={'exit'}
          />

          <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center">
            {children}
          </div>
        </>
      </AnimatePresence>
    </Portal>
  );
}
