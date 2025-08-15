'use client';
import React from 'react';
import { BodyS } from '@/components/ui/Typography';
import { useRouter as useNextRouter } from 'next/navigation';

type IconTextRouterProps = {
  label?: string;
  routePath?: string;
  icoPath?: string;
  router?: { push: (path: string) => void }; // Storybook용 모킹
};

export function IconTextRouter({
  label = '메모하기',
  routePath,
  icoPath,
  router,
}: IconTextRouterProps) {
  const nextRouter = router ?? useNextRouter();

  return (
    <div
      onClick={() => {
        if (routePath) {
          nextRouter.push(routePath);
        }
      }}
      className="flex w-full cursor-pointer flex-col items-center justify-center gap-2"
    >
      {icoPath && (
        <img
          src={icoPath}
          alt={label}
          className="mr-2 inline-block h-17 w-17 rounded-full bg-[#F0F5FB] p-2"
        />
      )}

      <BodyS className="text-[#858688]">{label}</BodyS>
    </div>
  );
}
