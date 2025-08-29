import type { Metadata } from 'next';
import './globals.css';
import { QueryProvider } from '@/components/providers/query-provider';
import { HouseMemoProvider } from '@/components/providers/house-memo-provider';
import { Toaster } from 'react-hot-toast';
import IcoLogoAll from '@assets/ico-logo-all.svg';
import IcoHouse from '@assets/login/lco-house.svg';
import IcoLight from '@assets/login/lco-light.svg';
import IcoPlants from '@assets/login/lco-plants.svg';
import IcoSearch from '@assets/login/lco-search.svg';
import { TitleXl } from '@/components/ui/Typography';

export const metadata: Metadata = {
  title: 'zip.zip 마음에 쏙 드는 집을 찾아 .zip!',
  description: '마음에 쏙 드는 집을 찾아 .zip!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
          defer
        ></script>
      </head>
      <body
        className="h-dvh overflow-hidden bg-[linear-gradient(to_bottom,#F0F5FB_0%,#F0F5FB_60%,#98BBFF_100%)] antialiased"
        suppressHydrationWarning
      >
        <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
          <img
            src="/assets/bg-layout-02.svg"
            alt=""
            draggable={false}
            className="absolute bottom-0 left-1/2 w-[1920px] max-w-none -translate-x-1/2"
          />
          <img
            src="/assets/bg-layout-01.svg"
            alt=""
            draggable={false}
            className="absolute bottom-0 left-1/2 w-[1200px] max-w-none -translate-x-1/2"
          />
        </div>
        <HouseMemoProvider>
          <QueryProvider>
            <div className="h-full lg:hidden">{children}</div>

            <div className="absolute top-55 left-38 hidden lg:block">
              <IcoLogoAll className="h-[150px] w-80" />
              <TitleXl className="text-primary-50 ml-6 text-[32px] font-semibold">
                내기준에 맞는집
                <br />
                .zip! 해서 후회없게
              </TitleXl>
            </div>

            <div className="absolute right-10 flex h-full items-end justify-center">
              <div className="relative h-[600px] w-[540px] origin-bottom-right scale-[0.9]">
                <IcoHouse className="h-[600px] w-[540px]" />
                <IcoLight className="animate-light-sway absolute top-2 left-1/2 h-[160px] w-[140px] -translate-x-1/2" />
                <IcoPlants className="animate-plant-sway absolute right-[-24px] bottom-[90px] h-[260px] w-[240px]" />
                <IcoSearch className="animate-search-inspect absolute top-[24px] left-[80px] h-[200px] w-[225px] -translate-x-1/2 rotate-[5deg]" />
              </div>
            </div>

            {children}
            <Toaster position="top-center" reverseOrder={false} />
          </QueryProvider>
        </HouseMemoProvider>
      </body>
    </html>
  );
}
