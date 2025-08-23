'use client';
import React from 'react';
import { cn } from '@/utils/utils';
import { Icon } from '@/components/ui/Icon';
import type { IconName } from '@/components/ui/assets';
import Link from 'next/link';

export type HeaderProps = {
  title?: string;
  center?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  leftIconName?: IconName;
  leftAction?: () => void;
  leftHref?: string;
  leftIconColor?: React.ComponentProps<typeof Icon>['color'];
  rightIconName?: IconName;
  rightAction?: () => void;
  rightHref?: string;
  rightIconColor?: React.ComponentProps<typeof Icon>['color'];
  className?: string;
};

export const Header: React.FC<HeaderProps> = ({
  title,
  center,
  left,
  right,
  leftIconName,
  leftAction,
  leftHref,
  leftIconColor,
  rightIconName,
  rightAction,
  rightHref,
  rightIconColor,
  className,
}) => {
  // 좌측 버튼: 아이콘이 비었거나 'arrowLeft'면 기본 뒤로가기 동작, 아니면 leftAction 있을 때만 클릭
  const isBackIcon = !leftIconName || leftIconName === 'arrowLeft';
  const defaultBack = () => typeof window !== 'undefined' && window.history.back();
  const leftOnClick = leftAction ?? (isBackIcon ? defaultBack : undefined);
  const leftAria = isBackIcon ? 'back' : 'left';

  // 좌측 노드 구성
  const leftIconEl = (
    <Icon name={leftIconName ?? 'arrowLeft'} size={24} padding={10} color={leftIconColor} />
  );
  const leftNode =
    left !== undefined ? (
      left
    ) : leftHref ? (
      <Link
        href={leftHref}
        aria-label={leftAria}
        className="inline-flex cursor-pointer items-center justify-center rounded-xl"
      >
        {leftIconEl}
      </Link>
    ) : (
      <button
        type="button"
        aria-label={leftAria}
        {...(leftOnClick ? { onClick: leftOnClick } : {})}
        className="inline-flex cursor-pointer items-center justify-center rounded-xl"
      >
        {leftIconEl}
      </button>
    );

  // 우측 노드 구성: 아이콘/액션/링크 중 하나라도 있으면 자동 버튼/링크 렌더
  const shouldRenderRightAuto = rightIconName || rightAction || rightHref;
  const rightIconEl = (
    <Icon name={rightIconName ?? 'search'} size={24} padding={10} color={rightIconColor} />
  );
  const rightNode =
    right !== undefined ? (
      right
    ) : shouldRenderRightAuto ? (
      rightHref ? (
        <Link
          href={rightHref}
          aria-label="right"
          className="inline-flex cursor-pointer items-center justify-center rounded-xl"
        >
          {rightIconEl}
        </Link>
      ) : (
        <button
          type="button"
          aria-label="right"
          {...(rightAction ? { onClick: rightAction } : {})}
          className="inline-flex cursor-pointer items-center justify-center rounded-xl"
        >
          {rightIconEl}
        </button>
      )
    ) : null;

  return (
    <header
      className={cn('sticky top-0 left-0 z-20 w-full border-black/5 bg-white', className)}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className={cn('flex w-full items-center justify-between px-2')} style={{ height: 56 }}>
        <div className="flex w-11 items-center justify-start">{leftNode}</div>

        <div className="flex flex-1 items-center justify-center">
          {title ? (
            <span className="max-w-[70%] truncate text-base font-medium">{title}</span>
          ) : (
            (center ?? null)
          )}
        </div>

        <div className="flex w-11 items-center justify-end gap-1">{rightNode}</div>
      </div>
    </header>
  );
};
