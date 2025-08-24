import React from 'react';
import { TitleXs } from '../Typography';
import { BodyXs } from '../Typography';
import { Icon } from '../Icon';

type Props = {
  onClick?: () => void;
  question: string;
  description?: string;
  isFill?: boolean;
};

export function CheckListBoxFavoriteItem({ isFill, onClick, question, description }: Props) {
  return (
    <div className="flex flex-row items-center gap-3 px-2 py-1" onClick={onClick}>
      <Icon name="favorite" color={isFill ? 'secondary' : 'neutral'} />
      <div>
        <TitleXs>{question}</TitleXs>
        <BodyXs className="text-neutral-70">{description}</BodyXs>
      </div>
    </div>
  );
}
