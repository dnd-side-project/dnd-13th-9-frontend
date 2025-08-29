'use client';

import React from 'react';
import Image from 'next/image';
import AOS from 'aos';
import { MainLayout } from '@/components/layout';
import { Header } from '@/components/ui/Header';
import { BodyS, Title2xl, TitleL, TitleS, TitleXl, TitleXs } from '@/components/ui/Typography';

type Item = { title: string; desc: string };

const sections: { id: string; title: string; items: Item[] }[] = [
  {
    id: 'prep',
    title: '준비',
    items: [
      {
        title: '예산부터 정해요',
        desc: '내 돈과 대출 가능액을 합쳐,<br/>살 수 있는 집과 상한선을 잡아요.',
      },
      { title: '원하는 집 기준을 세워요', desc: '크기, 층수 등 꼭 필요한 기준을 세우세요.' },
      {
        title: '시세 감을 잡아요',
        desc: '부동산 앱에서 비슷한 집이<br/>얼마에 나오는지 살펴봐요.',
      },
      {
        title: '중개사에 딱 알려줘요',
        desc: '예산, 조건, 이사 시기를 정확히<br/>말해줘야 시간 낭비가 없어요.',
      },
    ],
  },
  {
    id: 'tour',
    title: '집 보기',
    items: [
      { title: '약속 시간은 꼭 지켜요', desc: '중개사와 집주인의 시간을 존중해주세요.' },
      { title: '거주자를 배려해요', desc: '양말 신고, 수납장은 허락받고 열어보세요.' },
      { title: '촬영은 꼭 허락받아요', desc: '거주자의 사생활을 지켜주세요.' },
    ],
  },
  {
    id: 'contract',
    title: '계약',
    items: [
      {
        title: '계약서를 꼼꼼히 봐요',
        desc: '주소·금액·날짜가 맞는지, 합의 내용이<br/>빠짐없이 적혔는지 확인해요.',
      },
      {
        title: '약속은 특약에 적어요',
        desc: '도배·수리·대출 상환 약속은<br/>글로 남겨야 안전해요.',
      },
      {
        title: '계약금을 안전하게 보내요',
        desc: '등기부등본에<br/>적힌 소유주 계좌로만 송금하세요.',
      },
    ],
  },
  {
    id: 'after',
    title: '입주 후',
    items: [
      { title: '깨끗하게 사용해요', desc: '청소와 원상복구는 기본이에요.' },
      { title: '관리비·월세를 제때 내요', desc: '약속된 날짜에 연체 없이 납부하세요.' },
    ],
  },
];

export default function EtiquettePage() {
  // 아이콘/딜레이 순서를 React 렌더링과 무관하게 결정적으로 계산

  React.useEffect(() => {
    AOS.init({ once: true, duration: 450, easing: 'ease-out', offset: 20 });
    const root = document.getElementById('main-layout');
    if (!root) return;
    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        AOS.refresh();
        rafId = 0;
      });
    };
    root.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      root.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);
  return (
    <MainLayout className="scrollbar-hidden z-[10]">
      <Header title="에티켓" leftBack />

      <div className="relative z-[10] px-6 py-4" data-aos="fade-up-10" data-aos-delay={0}>
        <TitleXl>
          에티켓을 지키면
          {'\n'}좋은 매물, 좋은 관계로 이어집니다.
        </TitleXl>
      </div>

      <div className="relative z-[10] flex flex-col gap-10 px-6 pb-12">
        {sections.map((sec, secIdx) => {
          const itemsBefore = sections.slice(0, secIdx).reduce((sum, s) => sum + s.items.length, 0);
          const titleDelay = (itemsBefore + 1) * 50; // 150ms 간격
          return (
            <section key={sec.id} className="flex flex-col gap-3">
              <TitleL className="text-neutral-90" data-aos="fade-up-10" data-aos-delay={titleDelay}>
                {sec.title}
              </TitleL>

              <div className="flex flex-col gap-4">
                {sec.items.map((it, idx) => {
                  const absoluteIdx = itemsBefore + idx + 1; // 1..12 (아이콘 번호용)
                  const iconNo = String(absoluteIdx).padStart(2, '0');
                  const iconSrc = `/assets/etiquette/ico-etiquette-${iconNo}.svg`;
                  const itemDelay = (idx + 1) * 150; // 섹션 내부 기준 150ms 간격
                  return (
                    <div
                      key={`${sec.id}-${idx}`}
                      className="border-neutral-40 flex max-h-[100px] items-center gap-4 rounded-2xl border bg-white p-4 py-5"
                      data-aos="fade-up-10"
                      data-aos-delay={itemDelay}
                    >
                      {/* 아이콘 자리 */}
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F0F5FB]">
                        <Image src={iconSrc} alt="" width={44} height={44} />
                      </div>

                      <div className="flex min-w-0 flex-col">
                        <TitleXs className="text-neutral-100">{it.title}</TitleXs>
                        <BodyS className="text-neutral-70 mt-1 font-normal">
                          <span dangerouslySetInnerHTML={{ __html: it.desc }} />
                        </BodyS>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </MainLayout>
  );
}
