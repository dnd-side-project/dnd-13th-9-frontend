import React from 'react';
import { BodyM } from '@/components/ui/Typography';

export function VerticalSlider() {
  return (
    <div className="flex w-full items-center justify-start gap-2 rounded-xl bg-[#F0F5FB] px-6 py-3">
      <p>icon</p>
      <BodyM>계약 전 반드시 등기부등본을 확인해보세요!</BodyM>
    </div>
  );
}
