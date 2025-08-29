'use client';

import { MainLayout } from '@/components/layout';
import React from 'react';

type LottiePlayerProps = React.HTMLAttributes<HTMLElement> & {
  src?: string;
  mode?: string;
  autoplay?: boolean;
  loop?: boolean;
  speed?: number | string;
  background?: string;
};

const LottiePlayer = (props: LottiePlayerProps) =>
  React.createElement('lottie-player', props as any);

type LoadingProps = {
  className?: string;
  size?: 'small' | 'medium' | 'large' | number;
  color?: string;
};

export function Loading({ className, size = 'medium' }: LoadingProps) {
  const sizePx =
    typeof size === 'number' ? size : size === 'small' ? 80 : size === 'large' ? 300 : 160;

  const rootClassName = ['flex items-center justify-center', className].filter(Boolean).join(' ');

  return (
    <MainLayout
      className={`${rootClassName} flex h-full items-center justify-center bg-white shadow-none`}
    >
      <LottiePlayer
        autoplay
        loop
        mode="normal"
        src="/lottie/loading.json"
        background="transparent"
        style={{ height: `${sizePx}px`, width: `${sizePx}px` }}
        suppressHydrationWarning
      />
    </MainLayout>
  );
}

export default Loading;
