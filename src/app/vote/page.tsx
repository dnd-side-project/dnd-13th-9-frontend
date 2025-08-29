'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { MainLayout } from '@/components/layout';
import { Header } from '@/components/ui/Header';
import { TitleXl, BodyXl } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button/Button';
import { motion, useAnimation } from 'framer-motion';

export default function VoteComingSoonPage() {
  const router = useRouter();

  return (
    <MainLayout className="flex w-full flex-col items-center bg-white pb-[80px]">
      <Header leftBack />

      <div className="flex grow flex-col items-center justify-center overflow-auto">
        <img src="/assets/ico-logo.svg" alt="zip.zip logo" className="h-14 w-14" />

        <div className="mt-5 text-center">
          <TitleXl className="text-neutral-100">
            어떤 집이 더 좋을지 <br /> 투표할 수 있는 기능이 곧 생겨요!
          </TitleXl>
        </div>

        <VoteAnimation />

        <div className="mt-[80px] pt-4" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
          <div className="flex w-full justify-center">
            <Button size="large" onClick={() => router.push('/')}>
              홈으로
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

function VoteAnimation() {
  const leftCtrl = useAnimation();
  const rightCtrl = useAnimation();
  const centerCtrl = useAnimation();

  React.useEffect(() => {
    async function run() {
      await leftCtrl.start({
        x: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 500, damping: 35 },
      });

      await rightCtrl.start({
        x: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 500, damping: 35 },
      });

      await centerCtrl.start({
        opacity: [0, 1, 1],
        scale: [0, 1.2, 1, 1.05, 1],
        rotate: [0, -6, 6, -3, 0],
        filter: [
          'drop-shadow(0 0 0 rgba(251,169,7,0))',
          'drop-shadow(0 0 18px rgba(251,169,7,0.95))',
          'drop-shadow(0 0 6px rgba(251,169,7,0.5))',
          'drop-shadow(0 0 14px rgba(251,169,7,0.75))',
          'drop-shadow(0 0 0 rgba(251,169,7,0))',
        ],
        transition: { duration: 0.9, times: [0, 0.25, 0.5, 0.75, 1] },
      });
    }

    run();
  }, [leftCtrl, rightCtrl, centerCtrl]);

  return (
    <div className="bg-primary-50/10 mx-auto mt-[80px] h-[200px] w-full max-w-[320px] overflow-hidden rounded-2xl md:max-w-[360px]">
      <div className="relative h-full w-full">
        <motion.img
          src="/assets/vote/img-vote-01.svg"
          alt="left house"
          className="absolute top-1/2 left-0 z-20 h-[200px] w-auto -translate-y-1/2"
          initial={{ x: -220, opacity: 0 }}
          animate={leftCtrl}
        />
        <motion.img
          src="/assets/vote/img-vote-02.svg"
          alt="right house"
          className="absolute top-1/2 right-0 z-10 h-[200px] w-auto -translate-y-1/2"
          initial={{ x: 220, opacity: 0 }}
          animate={rightCtrl}
        />
        <motion.img
          src="/assets/vote/ico-vote.svg"
          alt="vote vs"
          className="animate-electric-jitter absolute top-1/2 left-1/2 z-30 h-[240px] w-auto -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0, opacity: 0 }}
          animate={centerCtrl}
        />
      </div>
    </div>
  );
}
