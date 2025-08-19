import React from 'react';
import { TitleXs } from '../../ui/Typography';

type Props = {
  label: string;
  required?: boolean;
  children?: React.ReactNode;
};

export function LabelContainer({ label, required = false, children }: Props) {
  return (
    <div className="flex flex-col items-start gap-2 align-top">
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
