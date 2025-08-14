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
  router?: { push: (path: string) => void }; // Storybook용 모킹 타입
};

export function RouteBox({
  routePath,
  title = '매물 지도',
  description = '지도 위에 메모해둬야지',
  size = 'large',
  bgColor = '#669AFF',
  textColor = '#FFFFFF',
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
        'flex flex-col items-start rounded-2xl p-4 select-none',
        size === 'large' ? 'h-68 w-1/2' : 'h-32',
        routePath && 'cursor-pointer'
      )}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <TitleS>{title}</TitleS>
      <Body2xs>{description}</Body2xs>
    </div>
  );
}
