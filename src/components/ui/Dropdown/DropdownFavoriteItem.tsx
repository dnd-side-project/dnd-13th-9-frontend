import React from 'react';
import { TitleXs } from '../Typography';
import { BodyXs } from '../Typography';
import { Icon } from '../Icon';

type Props = {
  onClick?: () => void;
  question: string;
  description?: string;
};

export function DropdownFavoriteItem({ onClick, question, description }: Props) {
  return (
    <div className="flex flex-row gap-2" onClick={onClick}>
      <Icon name="favorite" color="secondary" />
      <div>
        <TitleXs>{question}</TitleXs>
        <BodyXs>{description}</BodyXs>
      </div>
    </div>
  );
}
