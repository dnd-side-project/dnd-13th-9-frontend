import { TitleXs } from '../Typography';
import { cn } from '@/utils/utils';
import { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'tertiary';
type Size = 'small' | 'medium' | 'large';

export type ButtonProps = {
  variant?: Variant;
  size?: Size;
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: ReactNode;
  loading?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  variant = 'primary',
  size = 'small',
  label,
  children,
  disabled = false,
  loading = false,
  className,
  ...props
}: ButtonProps) => {
  const baseClass =
    'inline-flex items-center justify-center rounded-xl transition-colors duration-200';

  const sizeClass: Record<Size, string> = {
    small: 'px-7 py-3 max-w-[120px]',
    medium: 'px-12 py-3 min-w-[150px]',
    large: 'px-36 py-4 min-w-[310px] md:w-92',
  };

  const variantClass: Record<Variant, string> = {
    primary: 'bg-primary-50 hover:bg-primary-55 text-white',
    secondary: 'bg-coolGray-80 hover:bg-neutral-90 text-white',
    tertiary: 'bg-neutral-40 hover:bg-neutral-50 text-neutral-90',
  };

  const disabledClass = 'opacity-50 cursor-not-allowed hover:none';

  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={cn(
        baseClass,
        sizeClass[size],
        variantClass[variant],
        (disabled || loading) && disabledClass,
        'gap-2',
        className
      )}
      {...props}
    >
      <div className="inline-flex items-center gap-2">
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        )}
        <TitleXs className="whitespace-nowrap">{children || label}</TitleXs>
      </div>
    </button>
  );
};
