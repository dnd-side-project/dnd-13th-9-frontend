'use client';
import React from 'react';

type LottiePlayerProps = React.HTMLAttributes<HTMLElement> & {
  src?: string;
  mode?: string;
  autoplay?: boolean;
  loop?: boolean;
  speed?: number | string;
};

const LottiePlayer = (props: LottiePlayerProps) =>
  React.createElement('lottie-player', props as any);

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/60 backdrop-blur-[2px]">
      <LottiePlayer
        autoplay
        loop
        mode="normal"
        src="/lottie/loading.json"
        style={{ height: '300px', width: '300px' }}
      />
    </div>
  );
}
