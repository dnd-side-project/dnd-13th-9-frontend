import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/utils';
import { Icon } from '@/components/ui/Icon/Icon';
import type { IconName } from '@/components/ui/assets';
import type { IconColor } from '@/utils/style/colors';
import { BodyM } from '../Typography';

type FabColor = 'primary' | 'white' | 'neutral';

type BaseProps = {
  icon: IconName;
  label?: string;
  color?: FabColor;
  className?: string;
  /** 아이콘 색상 강제 지정 (지정하지 않으면 버튼의 텍스트 색을 기반으로 기본 매핑 사용) */
  iconColor?: string;
};

type FabProps = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;

const dims = { icon: 24, pad: 'p-3' } as const;

function colorClasses(color: FabColor, hasLabel: boolean) {
  if (color === 'primary') {
    return hasLabel
      ? 'bg-primary-55 text-white shadow-md hover:shadow-lg active:opacity-90'
      : 'bg-primary-55 text-white shadow-md hover:shadow-lg active:opacity-90';
  }
  if (color === 'white') {
    return hasLabel
      ? 'bg-white text-neutral-110 shadow-md hover:shadow-lg active:opacity-90'
      : 'bg-white text-neutral-110 shadow-md hover:shadow-lg active:opacity-90';
  }
  // neutral (gray)
  return hasLabel
    ? 'bg-neutral-20 text-neutral-110 shadow-md hover:shadow-lg active:opacity-90'
    : 'bg-neutral-20 text-neutral-110 shadow-md hover:shadow-lg active:opacity-90';
}

export const Fab = forwardRef<HTMLButtonElement, FabProps>(function Fab(
  { icon, label, color = 'primary', className, iconColor, ...props },
  ref
) {
  const hasLabel = Boolean(label);

  const defaultIconColor: IconColor = color === 'primary' ? 'white' : 'black';
  const resolvedIconColor = iconColor ?? defaultIconColor;

  return (
    <button
      ref={ref}
      className={cn(
        'absolute grid place-items-center rounded-full transition-shadow select-none',
        hasLabel ? 'inline-flex items-center gap-1 rounded-full px-4 py-3' : dims.pad,
        colorClasses(color, hasLabel),
        className
      )}
      {...props}
    >
      <Icon name={icon} size={dims.icon} color={resolvedIconColor} />
      {hasLabel && <BodyM>{label}</BodyM>}
    </button>
  );
});
