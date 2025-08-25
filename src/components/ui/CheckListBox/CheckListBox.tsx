import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/utils';

type Props = {
  children: ReactNode;
  className?: string;
};

export function CheckListBox({ children, className }: Props) {
  return (
    <motion.div className={cn('w-full gap-2 rounded-2xl bg-white', className)}>
      {children}
    </motion.div>
  );
}
