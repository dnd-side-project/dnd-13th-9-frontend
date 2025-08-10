import { ComponentPropsWithoutRef, createElement, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/utils';

const variantClasses = cva('whitespace-pre-wrap', {
  variants: {
    type: {
      Title2xl: 'text-[22px] leading-[130%] font-semibold tracking-[-0.025em] font-pretendard',
      TitleXl: 'text-[20px] leading-[130%] font-bold tracking-[-0.025em] font-pretendard',
      TitleL: 'text-[19px] leading-[140%] font-bold tracking-[-0.025em] font-pretendard',
      TitleM: 'text-[19px] leading-[140%] font-semibold tracking-[-0.025em] font-pretendard',
      TitleS: 'text-[16px] leading-[140%] font-bold tracking-[-0.025em] font-pretendard',
      TitleXs: 'text-[16px] leading-[140%] font-semibold tracking-[-0.025em] font-pretendard',
      BodyXl: 'text-[16px] leading-[140%] font-medium tracking-[-0.025em] font-pretendard',
      BodyL: 'text-[16px] leading-[140%] font-normal tracking-[-0.025em] font-pretendard',
      BodyM: 'text-[15px] leading-[140%] font-medium tracking-[-0.025em] font-pretendard',
      BodyS: 'text-[14px] leading-[140%] font-medium tracking-[-0.025em] font-pretendard',
      BodyXs: 'text-[14px] leading-[140%] font-normal tracking-[-0.025em] font-pretendard',
      Body2xs: 'text-[12px] leading-[140%] font-medium tracking-[-0.025em] font-pretendard',
      Body3xs: 'text-[12px] leading-[140%] font-normal tracking-[-0.025em] font-pretendard',
      PoppinsTitleXl: 'text-[24px] leading-[130%] font-semibold tracking-[0] font-poppins',
    },
  },
  defaultVariants: {
    type: 'BodyXl',
  },
});

type TypographyVariant = VariantProps<typeof variantClasses>['type'];

type AllowedTag = 'p' | 'div' | 'label' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type TypographyProps<T extends AllowedTag> = {
  as?: T;
  className?: string;
  children?: ReactNode;
  variant?: NonNullable<TypographyVariant>;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>;

export function Typography<T extends AllowedTag = 'p'>({
  as,
  className,
  children,
  variant,
  ...props
}: TypographyProps<T>) {
  const Component = as || 'p';
  const variantClass = variantClasses({ type: variant });

  return createElement(
    Component,
    {
      className: cn(variantClass, className),
      ...props,
    },
    children
  );
}

const createTypography = (variant: NonNullable<TypographyVariant>) => {
  function Component<T extends AllowedTag = 'p'>(props: Omit<TypographyProps<T>, 'variant'>) {
    return <Typography variant={variant} {...props} />;
  }
  return Component;
};

// Title Components
export const Title2xl = createTypography('Title2xl');
export const TitleXl = createTypography('TitleXl');
export const TitleL = createTypography('TitleL');
export const TitleM = createTypography('TitleM');
export const TitleS = createTypography('TitleS');
export const TitleXs = createTypography('TitleXs');

// Body Components
export const BodyXl = createTypography('BodyXl');
export const BodyL = createTypography('BodyL');
export const BodyM = createTypography('BodyM');
export const BodyS = createTypography('BodyS');
export const BodyXs = createTypography('BodyXs');
export const Body2xs = createTypography('Body2xs');
export const Body3xs = createTypography('Body3xs');

// Poppins Components
export const PoppinsTitleXl = createTypography('PoppinsTitleXl');
