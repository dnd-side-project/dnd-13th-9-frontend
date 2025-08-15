import React from 'react';
import { TitleXs } from '../../ui/Typography';

type Props = {
  label: string;
  required?: boolean;
};

export function LabelContainer({ label, required = false }: Props) {
  return (
    <div className="flex items-center align-top">
      <TitleXs>{label}</TitleXs>
      {required && (
        <span className="bg-secondary-50 ml-1 inline-block h-2 w-2 -translate-y-1.5 rounded-full" />
      )}
    </div>
  );
}
