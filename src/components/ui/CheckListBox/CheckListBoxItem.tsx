import React from 'react';
import { TitleXs } from '../Typography';
import { BodyXs } from '../Typography';

type Props = {
  onClick?: () => void;
  question: string;
  description?: string;
};

export function CheckListBoxItem({ onClick, question, description }: Props) {
  return (
    <div className="flex flex-col gap-2 px-5" onClick={onClick}>
      <TitleXs>{question}</TitleXs>
      <BodyXs className="text-neutral-70">{description}</BodyXs>
    </div>
  );
}
