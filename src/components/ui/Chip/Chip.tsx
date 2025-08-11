import React from 'react';
import { BodyS } from '../Typography';

type Props = {
  /**
   * The text content to be displayed.
   */
  text: string;
  /**
   * The style variant of the chip.
   */
  variant?: 'primary' | 'secondary';
} & React.HTMLAttributes<HTMLDivElement>;

export function Chip({ text, variant = 'primary', ...props }: Props) {
  const variantStyles = {
    primary: 'bg-[#669AFF] text-white',
    secondary: 'bg-[#F4F4F4] text-[#707070]',
  };

  const badgeStyle = variantStyles[variant];

  return (
    <div className={`w-min cursor-pointer rounded-3xl px-5 py-2 ${badgeStyle}`} {...props}>
      <BodyS className="text-center whitespace-nowrap">{text}</BodyS>
    </div>
  );
}
