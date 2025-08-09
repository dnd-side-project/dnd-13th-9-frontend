import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative mx-auto flex h-full min-h-0 w-full max-w-110 min-w-80 grow flex-col overflow-y-auto bg-white">
      {children}
    </div>
  );
}
