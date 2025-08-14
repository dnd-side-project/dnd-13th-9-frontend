import React from 'react';
import { Body3xs, Body2xs } from '../Typography';
import { cn } from '@/utils/utils';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  unit?: string;
  rightChildren?: React.ReactNode;
  error?: string;
};

export function Input({
  value,
  onChange,
  placeholder,
  unit,
  rightChildren,
  error,
  className,
  ...props
}: InputProps) {
  return (
    <div className="flex h-fit w-full flex-col gap-1">
      <div
        className={cn(
          'bg-neutral-30 focus-within:border-primary flex w-full items-center gap-2 rounded-xl border-2 px-4 py-3',
          error ? 'border-status-red' : 'border-transparent',
          className
        )}
      >
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="font-pretendard placeholder:text-neutral-70 flex-1 bg-transparent text-[16px] leading-[140%] font-normal outline-none"
          {...props}
        />
        {unit && <Body3xs className="text-neutral-80">{unit}</Body3xs>}
        {rightChildren}
      </div>
      {error && <Body2xs className="text-status-red px-2">{error}</Body2xs>}
    </div>
  );
}
