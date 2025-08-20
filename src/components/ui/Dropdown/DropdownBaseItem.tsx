import React from 'react';
import { TitleXs } from '../Typography';
import { BodyXs } from '../Typography';

type Props = {
  onClick?: () => void;
  question: string;
  description?: string;
};

export function DropdownBaseItem({ onClick, question, description }: Props) {
  return (
    <div className="flex flex-col gap-2" onClick={onClick}>
      <TitleXs>{question}</TitleXs>
      <BodyXs>{description}</BodyXs>
    </div>
  );
}
