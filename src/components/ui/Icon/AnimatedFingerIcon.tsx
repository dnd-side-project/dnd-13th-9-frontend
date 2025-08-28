'use client';

import React from 'react';
import IcoFinger from '@assets/main/ico-finger.svg';

type Props = {
  className?: string;
  delayMs?: number; // 텍스트 등장 타이밍과 맞추기 위한 지연
  trigger?: number; // 값이 바뀔 때마다 한 번 강조 애니메이션 실행
};

export function AnimatedFingerIcon({ className, delayMs = 0, trigger }: Props) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [animate, setAnimate] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          const timer = setTimeout(() => setAnimate(true), Math.max(0, delayMs));
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delayMs]);

  // 외부 trigger 값이 바뀔 때마다 한 번 재생
  React.useEffect(() => {
    if (trigger === undefined) return;
    // 클래스를 다시 적용하기 위해 false로 초기화 후 지연 적용
    setAnimate(false);
    const t = setTimeout(() => setAnimate(true), Math.max(0, delayMs));
    return () => clearTimeout(t);
  }, [trigger, delayMs]);

  return (
    <div ref={ref}>
      <IcoFinger
        className={`${className} ${animate ? 'animate-finger-emphasize' : ''}`}
        onAnimationEnd={() => setAnimate(false)}
      />
    </div>
  );
}

export default AnimatedFingerIcon;
