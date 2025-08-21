import React from 'react';
import { BodyS } from '../Typography';
import { cn } from '@/utils/utils';
import { Icon } from '../Icon';
import { IconName } from '../assets';

type Props = {
  /**
   * The text content to be displayed.
   */
  text: string;
  /**
   * The style variant of the chip.
   */
  variant?: 'primary' | 'secondary' | 'neutral';
  iconName?: IconName;
} & React.HTMLAttributes<HTMLDivElement>;

export function Chip({ text, variant = 'primary', className, iconName, ...props }: Props) {
  const variantStyles = {
    primary: 'bg-primary-50 text-white',
    secondary: 'bg-secondary-50 text-white',
    neutral: 'bg-neutral-30 text-neutral-80',
  };

  const badgeStyle = variantStyles[variant];

  return (
    <div
      className={cn(
        'flex w-min cursor-pointer items-center gap-2 rounded-3xl px-5 py-2',
        badgeStyle,
        className
      )}
      {...props}
    >
      {iconName && <Icon name={iconName} />}
      <BodyS className="text-center whitespace-nowrap">{text}</BodyS>
    </div>
  );
}
