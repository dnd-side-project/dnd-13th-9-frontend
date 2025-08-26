'use client';

import React from 'react';
import { BodyM } from '@/components/ui/Typography';
import IcoFinger from '@assets/ico-finger.svg';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

const MESSAGES: string[] = [
  '계약 전, 꼭 등기부등본을 확인해보세요!',
  '현 입주자에게 관리비 내역을 요청해보세요!',
  '건물에 빈 집이 많지는 않은지 확인하세요!',
  '큰 도로 옆이면 차 소음이 시끄러울 수 있어요!',
  '관리비에 어떤 비용이 들어가는지 살펴보세요!',
  '계약서는 잘 보관해두세요!',
  '전세는 확정일자와 전입신고가 필수예요!',
  '저층이라면 방범창 확인이 필요해요',
  '집주인 거주 건물은 관리가 잘되는 편이에요!',
  '집 안에서 휴대폰 통신 상태도 확인해보세요!',
  '햇빛 부족한 집은 곰팡이·난방비를 주의하세요!',
];

const DURATION = 0.5; // enter/exit 애니메이션 시간
const VISIBLE_MS = 3000; // 노출 유지 시간

export function VerticalSlider() {
  const router = useRouter();
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const id = window.setInterval(
      () => {
        setIndex((i) => (i + 1) % MESSAGES.length);
      },
      VISIBLE_MS + DURATION * 1000 * 2
    ); // enter+exit 시간만큼 버퍼
    return () => clearInterval(id);
  }, []);

  const handleClick = () => router.push('/etiquette');

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex max-h-[75px] w-full items-center justify-start gap-2 rounded-2xl bg-[#F0F5FB] p-5 text-left"
    >
      <IcoFinger className="h-8 w-8 shrink-0" />

      {/* 고정 높이를 주어 레이아웃 점프 방지 (BodyM 라인 높이에 맞춰 조정하세요) */}
      <div className="relative w-full overflow-hidden" style={{ height: 24 }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: DURATION, ease: 'easeOut' }}
          >
            <BodyM>{MESSAGES[index]}</BodyM>
          </motion.div>
        </AnimatePresence>
      </div>
    </button>
  );
}
