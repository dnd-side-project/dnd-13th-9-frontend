import type { Metadata } from 'next';
import './globals.css';
import { QueryProvider } from '@/components/providers/query-provider';
import { HouseMemoProvider } from '@/components/providers/house-memo-provider';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'zip.zip',
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
      <body className="h-dvh overflow-hidden bg-gray-100 antialiased" suppressHydrationWarning>
        <HouseMemoProvider>
          <QueryProvider>
            {children}
            <Toaster position="top-center" reverseOrder={false} />
          </QueryProvider>
        </HouseMemoProvider>
      </body>
    </html>
  );
}
