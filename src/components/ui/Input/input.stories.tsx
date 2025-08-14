import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';

import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Common/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          '텍스트 입력 컴포넌트. placeholder는 BodyL 스타일을 따르며 에러 상태에서 테두리/메시지를 표시합니다.',
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: '입력값(Controlled)',
      table: { category: 'Controlled' },
    },
    onChange: {
      action: 'changed',
      description: '입력값 변경 이벤트',
      table: { category: 'Events' },
    },
    placeholder: {
      control: 'text',
      description: 'placeholder 문구',
    },
    unit: {
      control: 'text',
      description: '우측 단위 표시(예: km, m)',
    },
    error: {
      control: 'text',
      description: '에러 메시지 (존재 시 에러 스타일 활성화)',
    },
    rightChildren: {
      control: false,
      description: '우측 커스텀 요소 (아이콘/버튼 등)',
      table: { category: 'Slots' },
    },
    className: { control: 'text' },
  },
  args: {
    value: '',
    placeholder: 'Input',
    unit: undefined,
    error: undefined,
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Basic: Story = {
  name: 'Basic',
  render: (args) => {
    const [val, setVal] = useState(args.value ?? '');
    return (
      <div className="w-[360px]">
        <Input {...args} value={val} onChange={(e) => setVal(e.target.value)} />
      </div>
    );
  },
};

export const WithUnit: Story = {
  args: { unit: '만원' },
  render: (args) => {
    const [val, setVal] = useState('12');
    return (
      <div className="w-[360px]">
        <Input {...args} value={val} onChange={(e) => setVal(e.target.value)} />
      </div>
    );
  },
};

export const WithRightChildren: Story = {
  render: (args) => {
    const [val, setVal] = useState('집.zip');
    return (
      <div className="w-[360px]">
        <Input
          {...args}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          rightChildren={
            <button
              type="button"
              className="text-neutral-70 hover:text-neutral-90 transition"
              onClick={() => setVal('')}
              aria-label="지우기"
            >
              ✕
            </button>
          }
        />
      </div>
    );
  },
};

export const WithError: Story = {
  render: (args) => {
    const [val, setVal] = useState('너무너무너무너무긴제목');

    const error = val.length > 10 ? '제목은 10자 이하로 입력해주세요.' : undefined;

    return (
      <div className="w-[360px]">
        <Input {...args} value={val} onChange={(e) => setVal(e.target.value)} error={error} />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true, value: 'disabled', unit: '만원' },
  render: (args) => (
    <div className="w-[360px] opacity-70">
      <Input {...args} onChange={() => {}} />
    </div>
  ),
};

export const WithMaxLengthAndCounter: Story = {
  name: 'With MaxLength + Counter',
  args: { maxLength: 20 },
  render: (args) => {
    const [val, setVal] = useState('');

    const length = val.length;
    const error =
      args.maxLength && length > (args.maxLength as number)
        ? `최대 ${args.maxLength as number}자까지 입력 가능합니다.`
        : undefined;

    return (
      <div className="w-[360px] space-y-1">
        <Input
          {...args}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          error={error}
          rightChildren={
            <span className="text-neutral-70 text-xs">
              {length}
              {args.maxLength ? `/${args.maxLength}` : ''}
            </span>
          }
        />
      </div>
    );
  },
};
