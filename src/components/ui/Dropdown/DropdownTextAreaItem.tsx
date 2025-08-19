import React from 'react';

type Props = {
  placeholder?: string;
  value?: string;
  onChange?: (val: string) => void;
};

export function DropdownTextAreaItem({ placeholder, value, onChange }: Props) {
  return (
    <textarea
      className="bg-neutral-30 text-neutral-70 resize-none rounded-xl px-3 py-3 focus:border-none focus:outline-none"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
}
