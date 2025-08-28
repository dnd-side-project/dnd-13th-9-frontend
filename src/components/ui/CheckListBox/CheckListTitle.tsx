import React from 'react';
import { Icon } from '../Icon';
import { TitleM } from '../Typography';
import { IconName } from '../assets';

type Props = {
  iconName?: IconName;
  title: string;
  className?: string;
};

export function CheckListTitle({ iconName = 'example', title, className }: Props) {
  return (
    <div className={`flex gap-1 px-5 py-4 pt-6 ${className || ''}`}>
      <Icon width={30} name={iconName} />
      <TitleM>{title}</TitleM>
    </div>
  );
}
