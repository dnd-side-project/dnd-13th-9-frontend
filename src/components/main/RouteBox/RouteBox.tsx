'use client';
import React from 'react';
import { TitleS } from '@/components/ui/Typography';
import { Body2xs } from '@/components/ui/Typography';
import { cn } from '@/utils/utils';
import { useRouter as useNextRouter } from 'next/navigation';

type RouteBoxProps = {
  routePath?: string;
  textColor?: string;
  title?: string;
  description?: string;
  size?: 'small' | 'large';
  bgColor?: string;
  bgImageSrc?: string;
  overlayImageSrc?: string;
  bgImageClassName?: string;
  overlayClassName?: string;
  router?: { push: (path: string) => void }; // Storybook용 모킹 타입
};

export function RouteBox({
  routePath,
  title = '매물 지도',
  description = '지도 위에 메모해둬야지',
  size = 'large',
  bgColor = '#669AFF',
  textColor = '#FFFFFF',
  bgImageSrc,
  overlayImageSrc,
  bgImageClassName,
  overlayClassName,
  router,
}: RouteBoxProps) {
  const nextRouter = router ?? useNextRouter();

  const handleClick = () => {
    if (routePath) {
      nextRouter.push(routePath);
    }
  };

  return (
    <div
      onClick={handleClick}
      role={routePath ? 'button' : undefined}
      tabIndex={routePath ? 0 : undefined}
      className={cn(
        'relative flex flex-col items-start overflow-hidden rounded-2xl p-4 select-none',
        size === 'large' ? 'h-68 basis-1/2' : 'h-32',
        routePath && 'cursor-pointer'
      )}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="relative z-10">
        <TitleS>{title}</TitleS>
        <Body2xs className="mt-1 text-[13px]">{description}</Body2xs>
      </div>
      {bgImageSrc && (
        <img
          src={bgImageSrc}
          alt=""
          aria-hidden
          className={cn(
            'pointer-events-none absolute right-0 bottom-0 z-0 select-none',
            size === 'large' ? 'h-full' : '',
            bgImageClassName
          )}
        />
      )}
      {overlayImageSrc && (
        <img
          src={overlayImageSrc}
          alt=""
          aria-hidden
          className={cn('pointer-events-none absolute z-[5] select-none', overlayClassName)}
        />
      )}
    </div>
  );
}
