import React from 'react';
import { TitleXs } from '../../ui/Typography';
import { cn } from '@/utils/utils';

type Props = {
  label: string;
  required?: boolean;
  children?: React.ReactNode;
  className?: string;
};

export function LabelContainer({ label, required = false, children, className }: Props) {
  return (
    <div className={cn('relative flex flex-col items-start gap-2 align-top', className)}>
      <TitleXs>
        {label}
        {required && (
          <span className="bg-secondary-50 ml-1 inline-block h-2 w-2 -translate-y-1.5 rounded-full" />
        )}
      </TitleXs>

      {children}
    </div>
  );
}
