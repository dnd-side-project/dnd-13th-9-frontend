import { ComponentPropsWithoutRef, createElement, ReactNode } from 'react';

import { cn } from '@/utils/utils';

type TypographyVariant =
  // Title
  | 'title-2xl-semibold-22'
  | 'title-xl-bold-20'
  | 'title-l-bold-19'
  | 'title-m-semibold-19'
  | 'title-s-bold-16'
  | 'title-xs-semibold-16'
  // Body
  | 'body-xl-medium-16'
  | 'body-l-regular-16'
  | 'body-m-medium-15'
  | 'body-s-medium-14'
  | 'body-xs-regular-14'
  | 'body-2xs-medium-12'
  | 'body-3xs-regular-12'
  // Poppins
  | 'poppins-title-xl-semibold-24';

const variantClasses: Record<TypographyVariant, string> = {
  // Title (Pretendard)
  'title-2xl-semibold-22':
    'text-[22px] leading-[130%] font-semibold tracking-[-0.025em] whitespace-pre-wrap font-pretendard',
  'title-xl-bold-20':
    'text-[20px] leading-[130%] font-bold tracking-[-0.025em] whitespace-pre-wrap font-pretendard',
  'title-l-bold-19':
    'text-[19px] leading-[140%] font-bold tracking-[-0.025em] whitespace-pre-wrap font-pretendard',
  'title-m-semibold-19':
    'text-[19px] leading-[140%] font-semibold tracking-[-0.025em] whitespace-pre-wrap font-pretendard',
  'title-s-bold-16':
    'text-[16px] leading-[140%] font-bold tracking-[-0.025em] whitespace-pre-wrap font-pretendard',
  'title-xs-semibold-16':
    'text-[16px] leading-[140%] font-semibold tracking-[-0.025em] whitespace-pre-wrap font-pretendard',
  // Body (Pretendard)
  'body-xl-medium-16':
    'text-[16px] leading-[140%] font-medium tracking-[-0.025em] whitespace-pre-wrap font-pretendard',
  'body-l-regular-16':
    'text-[16px] leading-[140%] font-normal tracking-[-0.025em] whitespace-pre-wrap font-pretendard',
  'body-m-medium-15':
    'text-[15px] leading-[140%] font-medium tracking-[-0.025em] whitespace-pre-wrap font-pretendard',
  'body-s-medium-14':
    'text-[14px] leading-[140%] font-medium tracking-[-0.025em] whitespace-pre-wrap font-pretendard',
  'body-xs-regular-14':
    'text-[14px] leading-[140%] font-normal tracking-[-0.025em] whitespace-pre-wrap font-pretendard',
  'body-2xs-medium-12':
    'text-[12px] leading-[140%] font-medium tracking-[-0.025em] whitespace-pre-wrap font-pretendard',
  'body-3xs-regular-12':
    'text-[12px] leading-[140%] font-normal tracking-[-0.025em] whitespace-pre-wrap font-pretendard',
  // Poppins
  'poppins-title-xl-semibold-24':
    'text-[24px] leading-[130%] font-semibold tracking-[0] whitespace-pre-wrap font-poppins',
};

const defaultVariant: TypographyVariant = 'body-xl-medium-16';

type AllowedTag = 'p' | 'div' | 'label' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type TypographyProps<T extends AllowedTag> = {
  as?: T;
  className?: string;
  children?: ReactNode;
  variant?: TypographyVariant;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>;

export function Typography<T extends AllowedTag = 'p'>({
  as,
  className,
  children,
  variant,
  ...props
}: TypographyProps<T>) {
  const Component = as || 'p';
  const variantClass = variantClasses[variant || defaultVariant];

  return createElement(
    Component,
    {
      className: cn(variantClass, className),
      ...props,
    },
    children
  );
}

const createTypography = (variant: TypographyVariant) => {
  function Component<T extends AllowedTag = 'p'>(props: Omit<TypographyProps<T>, 'variant'>) {
    return <Typography variant={variant} {...props} />;
  }
  return Component;
};

// Title Components
export const Title2xl = createTypography('title-2xl-semibold-22');
export const TitleXl = createTypography('title-xl-bold-20');
export const TitleL = createTypography('title-l-bold-19');
export const TitleM = createTypography('title-m-semibold-19');
export const TitleS = createTypography('title-s-bold-16');
export const TitleXs = createTypography('title-xs-semibold-16');

// Body Components
export const BodyXl = createTypography('body-xl-medium-16');
export const BodyL = createTypography('body-l-regular-16');
export const BodyM = createTypography('body-m-medium-15');
export const BodyS = createTypography('body-s-medium-14');
export const BodyXs = createTypography('body-xs-regular-14');
export const Body2xs = createTypography('body-2xs-medium-12');
export const Body3xs = createTypography('body-3xs-regular-12');

// Poppins Components
export const PoppinsTitleXl = createTypography('poppins-title-xl-semibold-24');
