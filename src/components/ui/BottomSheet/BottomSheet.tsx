import React from 'react';
import { Portal } from '../Portal';
import { motion, AnimatePresence } from 'framer-motion';
import { BOTTOMSHEET_MOTION, OVERLAY_MOTION } from '@/utils/style/animations/motionConstants';

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
};

export function BottomSheet({ isOpen, closeModal, children }: Props) {
  return (
    <Portal isOpen={isOpen}>
      <AnimatePresence>
        <>
          <motion.div
            className="fixed inset-0 z-30 bg-black/50"
            variants={OVERLAY_MOTION}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={closeModal}
          />

          <motion.div
            className="fixed bottom-0 left-0 z-40 w-full rounded-t-2xl bg-white shadow-lg"
            variants={BOTTOMSHEET_MOTION}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {children}
          </motion.div>
        </>
      </AnimatePresence>
    </Portal>
  );
}
