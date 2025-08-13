import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Portal } from '../Portal';
import { OVERLAY_MOTION, CONTENT_MOTION } from '@/utils/style/animations/motionConstants';

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
};

export function Modal({ isOpen, closeModal, children }: Props) {
  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="absolute inset-0 z-30 bg-black/50"
              onClick={closeModal}
              variants={OVERLAY_MOTION}
              initial="initial"
              animate="animate"
              exit="exit"
            />

            <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center">
              <motion.div
                className="pointer-events-auto"
                variants={CONTENT_MOTION}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {children}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
}
