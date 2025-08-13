import { Variants, Transition } from 'framer-motion';

// BottomSheet 모션
export const BOTTOMSHEET_MOTION: Variants = {
  initial: { y: '100%' },
  animate: {
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  exit: {
    y: '100%',
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
};

// Overlay 모션
export const OVERLAY_MOTION: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
