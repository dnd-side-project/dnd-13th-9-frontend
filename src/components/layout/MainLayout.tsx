import { ReactNode } from 'react';
import { cn } from '@/utils/utils';

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div
      id="main-layout"
      className={cn(
        'relative mx-auto flex h-full min-h-0 w-full max-w-110 min-w-80 grow flex-col overflow-y-auto bg-white',
        className
      )}
    >
      {children}
    </div>
  );
}
