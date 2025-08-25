'use client';
import { KakaoLoginButton } from '@/components/ui/KakaoLoginButton';
import { MainLayout } from '@/components/layout';
import { Title2xl, TitleXs } from '@/components/ui/Typography';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();

  return (
    <MainLayout className="flex w-full flex-col items-center justify-center bg-[#9ABCFF]">
      <Title2xl>내 기준에 맞는 집</Title2xl>
      <div className="flex">
        <Title2xl className="text-primary-55">.zip!</Title2xl>
        <Title2xl>해서 후회없게</Title2xl>
      </div>

      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Image src="/assets/png-main-illustration.png" width={300} height={300} alt="main" />
      </motion.div>

      <div className="pb-12 md:pb-0">
        <TitleXs className="translate-y-7 border-b-2 text-white" onClick={() => router.push('/')}>
          홈으로
        </TitleXs>
      </div>

      <div className="bg-primary-55 fixed bottom-0 flex w-110 justify-center py-4 pb-10">
        <KakaoLoginButton />
      </div>
    </MainLayout>
  );
}
