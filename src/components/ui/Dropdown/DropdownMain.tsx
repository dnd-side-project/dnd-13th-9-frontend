import React, { ReactNode } from 'react';
import { DropdownProvider, useDropdown } from './Dropdown.Context';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTENT_MOTION } from '@/utils/style/animations/motionConstants';
import { cn } from '@/utils/utils';

interface Props {
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
}

export function DropdownMain({ children, defaultOpen = false }: Props) {
  return <DropdownProvider defaultOpen={defaultOpen}>{children}</DropdownProvider>;
}

export function DropdownContent({ children, className }: Props) {
  const { isOpen } = useDropdown();
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          {...CONTENT_MOTION}
          className={cn('absolute mt-2 w-full rounded-2xl bg-white', className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
