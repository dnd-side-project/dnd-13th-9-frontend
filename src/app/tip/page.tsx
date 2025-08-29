'use client';

import React from 'react';
import { Header } from '@/components/ui/Header';
import { MainLayout } from '@/components/layout';
import { TitleXs } from '@/components/ui/Typography';
import { BodyS } from '@/components/ui/Typography';

const youtubeVideos = [
  {
    id: 'PtP5u092I_A',
    title: '사회 초년생, 혼자 계약하면 절대 안되는 이유',
    description: '혼자 계약할 때 어떤 위험이 있는지, 최소한 무엇을 알아야 하는지 알려줘요.',
    thumbnail: `https://img.youtube.com/vi/PtP5u092I_A/maxresdefault.jpg`,
    duration: '12:34',
  },
  {
    id: 'oYt9Xv3d2Wo',
    title: '자취 초보자를 위한 필수 팁',
    description: '처음 자취를 시작하는 분들을 위한 실용적인 조언들',
    thumbnail: `https://img.youtube.com/vi/oYt9Xv3d2Wo/maxresdefault.jpg`,
    duration: '8:45',
  },
  {
    id: 'GV-7RwtVIdg',
    title: '월세 계약 시 주의사항',
    description: '월세 계약을 할 때 꼭 확인해야 할 중요한 포인트들',
    thumbnail: `https://img.youtube.com/vi/GV-7RwtVIdg/maxresdefault.jpg`,
    duration: '15:22',
  },
  {
    id: 'EQlgJfxZkNE',
    title: '자취방 보안과 안전',
    description: '자취방에서 안전하게 생활하는 방법과 보안 팁',
    thumbnail: `https://img.youtube.com/vi/EQlgJfxZkNE/maxresdefault.jpg`,
    duration: '10:18',
  },
  {
    id: 'dW7OYZGuxF4',
    title: '자취비 절약 노하우',
    description: '자취 생활에서 비용을 절약할 수 있는 실용적인 방법들',
    thumbnail: `https://img.youtube.com/vi/dW7OYZGuxF4/maxresdefault.jpg`,
    duration: '13:56',
  },
];

export default function TipPage() {
  const handleVideoClick = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  return (
    <MainLayout>
      <Header leftBack={true} title="자취 팁 영상" />

      <div className="space-y-6 px-4 py-6">
        <div className="space-y-4">
          {youtubeVideos.map((video) => (
            <div
              key={video.id}
              className="cursor-pointer overflow-hidden bg-white duration-200"
              onClick={() => handleVideoClick(video.id)}
            >
              <div className="relative">
                <div className="px-4">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="h-48 w-full rounded-xl object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                    }}
                  />
                </div>

                <div className="absolute right-2 bottom-2.5 flex -translate-x-4 items-center gap-2">
                  <div className="bg-opacity-70 text-neutral-90 rounded-xl bg-white px-2 py-1 text-xs">
                    {video.duration}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <TitleXs className="text-neutral-110">{video.title}</TitleXs>
                <BodyS className="text-neutral-90">{video.description}</BodyS>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
