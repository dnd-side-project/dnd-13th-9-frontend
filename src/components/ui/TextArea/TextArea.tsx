import React, { TextareaHTMLAttributes } from 'react';
import { Body3xs, Body2xs } from '../Typography';
import { cn } from '@/utils/utils';

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  ref?: React.Ref<HTMLTextAreaElement>;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  rightChildren?: React.ReactNode;
  error?: string;
  rows?: number;
  maxLength?: number;
  showCounter?: boolean;
};

export function TextArea({
  ref,
  value,
  onChange,
  placeholder,
  rightChildren,
  error,
  className,
  rows = 4,
  maxLength,
  showCounter = false,
  ...props
}: TextAreaProps) {
  return (
    <div className="flex h-fit w-full flex-col gap-1">
      <div
        className={cn(
          'bg-neutral-30 focus-within:border-primary flex w-full flex-col gap-2 rounded-xl border-2 px-3 py-3',
          error ? 'border-status-red' : 'border-transparent',
          className
        )}
      >
        <div className="flex items-start gap-2">
          <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            maxLength={maxLength}
            className="font-pretendard placeholder:text-neutral-70 min-w-0 flex-1 resize-none bg-transparent text-[16px] leading-[140%] font-normal outline-none"
            {...props}
          />
          {rightChildren}
        </div>
        {(showCounter || maxLength) && (
          <div className="flex justify-end">
            <Body3xs className="text-neutral-70">
              {value.length}
              {maxLength ? `/${maxLength}` : ''}
            </Body3xs>
          </div>
        )}
      </div>
      {error && <Body2xs className="text-status-red px-2">{error}</Body2xs>}
    </div>
  );
}
