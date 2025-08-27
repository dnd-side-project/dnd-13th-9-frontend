import React from 'react';
import { BodyS, BodyXs } from '../Typography';
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
  /**
   * The size of the chip.
   */
  size?: 'sm' | 'md';
  iconName?: IconName;
} & React.HTMLAttributes<HTMLDivElement>;

export function Chip({
  text,
  variant = 'primary',
  size = 'md',
  className,
  iconName,
  ...props
}: Props) {
  const variantStyles = {
    primary: size === 'sm' ? 'bg-coolGray-20 text-primary-55' : 'bg-primary-50 text-white',
    secondary: size === 'sm' ? 'bg-[#FFF4DE] text-secondary-50' : 'bg-secondary-50 text-white',
    neutral: size === 'sm' ? 'bg-[#FFEFEB] text-[#FF6648]' : 'bg-neutral-30 text-neutral-80',
  };

  const sizeStyles = {
    sm: 'px-3 py-1 gap-1.5',
    md: 'px-5 py-2 gap-2',
  };

  const badgeStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  return (
    <div
      className={cn(
        'flex w-min cursor-pointer items-center rounded-3xl',
        sizeStyle,
        badgeStyle,
        className
      )}
      {...props}
    >
      {iconName && <Icon name={iconName} size={size === 'sm' ? 16 : 20} />}
      {size === 'sm' ? (
        <BodyXs className="text-center whitespace-nowrap">{text}</BodyXs>
      ) : (
        <BodyS className="text-center whitespace-nowrap">{text}</BodyS>
      )}
    </div>
  );
}
