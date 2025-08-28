'use client';
import { KakaoLoginButton } from '@/components/ui/KakaoLoginButton';
import { MainLayout } from '@/components/layout';
import { TitleM, TitleXs } from '@/components/ui/Typography';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import IcoLogoText from '@assets/ico-logo-text.svg';
import IcoHouse from '@assets/login/lco-house.svg';
import IcoLight from '@assets/login/lco-light.svg';
import IcoPlants from '@assets/login/lco-plants.svg';
import IcoSearch from '@assets/login/lco-search.svg';

export default function LoginPage() {
  const router = useRouter();

  return (
    <MainLayout className="flex h-full w-full flex-col items-center justify-center bg-white p-6">
      <div className="flex w-full flex-col items-center">
        <div className="flex flex-col items-center gap-[10px]">
          <IcoLogoText className="h-[34px] w-[108px]" />
          <TitleM className="text-neutral-90">마음에 쏙 드는 집을 찾아 .zip!</TitleM>
        </div>
        <div className="mt-[66px] flex flex-col items-center gap-[10px]">
          <div className="relative h-[297px] w-[268px]">
            <IcoHouse className="h-[297px] w-[268px]" />
            <IcoLight className="animate-light-sway absolute top-1 left-1/2 h-[79px] w-[70px] -translate-x-1/2" />
            <IcoPlants className="animate-plant-sway absolute right-[-10px] bottom-[50px] h-[130px] w-[118px]" />
            <IcoSearch className="animate-search-inspect absolute top-[10px] left-[30px] h-[114px] w-[128px] -translate-x-1/2 rotate-[5deg]" />
          </div>
        </div>
        <div className="mt-[116px] flex w-full flex-col items-center gap-6">
          <TitleXs className="text-neutral-90 cursor-pointer" onClick={() => router.push('/')}>
            홈으로
          </TitleXs>
          <KakaoLoginButton />
        </div>
      </div>
    </MainLayout>
  );
}
