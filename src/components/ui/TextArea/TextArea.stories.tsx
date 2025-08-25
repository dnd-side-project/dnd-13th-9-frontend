import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';

import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'Components/Common/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          '여러 줄 텍스트 입력 컴포넌트. Input과 동일한 디자인을 따르며, 여러 줄 입력과 글자 수 카운터를 지원합니다.',
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
    rows: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'textarea의 기본 행 수',
    },
    maxLength: {
      control: { type: 'number', min: 1, max: 1000 },
      description: '최대 입력 가능한 글자 수',
    },
    showCounter: {
      control: 'boolean',
      description: '글자 수 카운터 표시 여부',
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
    placeholder: 'TextArea',
    rows: 4,
    showCounter: false,
    error: undefined,
  },
};
export default meta;

type Story = StoryObj<typeof TextArea>;

export const Basic: Story = {
  name: 'Basic',
  render: (args) => {
    const [val, setVal] = useState(args.value ?? '');
    return (
      <div className="w-[360px]">
        <TextArea {...args} value={val} onChange={(e) => setVal(e.target.value)} />
      </div>
    );
  },
};

export const WithRows: Story = {
  name: 'With Custom Rows',
  args: { rows: 6 },
  render: (args) => {
    const [val, setVal] = useState(
      '여러 줄로 입력할 수 있는 \n두 번째 줄입니다.\n세 번째 줄입니다.'
    );
    return (
      <div className="w-[360px]">
        <TextArea {...args} value={val} onChange={(e) => setVal(e.target.value)} />
      </div>
    );
  },
};

export const WithMaxLength: Story = {
  name: 'With MaxLength',
  args: { maxLength: 100, showCounter: true },
  render: (args) => {
    const [val, setVal] = useState('최대 100자까지 입력할 수 있습니다.');
    return (
      <div className="w-[360px]">
        <TextArea {...args} value={val} onChange={(e) => setVal(e.target.value)} />
      </div>
    );
  },
};

export const WithRightChildren: Story = {
  name: 'With Right Children',
  render: (args) => {
    const [val, setVal] = useState('우측에 버튼이 있는 텍스트 영역입니다.');
    return (
      <div className="w-[360px]">
        <TextArea
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
  name: 'With Error',
  render: (args) => {
    const [val, setVal] = useState('너무 긴 텍스트입니다.');

    const error = val.length > 50 ? '텍스트는 50자 이하로 입력해주세요.' : undefined;

    return (
      <div className="w-[360px]">
        <TextArea {...args} value={val} onChange={(e) => setVal(e.target.value)} error={error} />
      </div>
    );
  },
};

export const Disabled: Story = {
  name: 'Disabled',
  args: { disabled: true, value: 'disabled text' },
  render: (args) => (
    <div className="w-[360px] opacity-70">
      <TextArea {...args} onChange={() => {}} />
    </div>
  ),
};

export const LongText: Story = {
  name: 'Long Text Example',
  args: { rows: 8, showCounter: true },
  render: (args) => {
    const [val, setVal] = useState(
      '이것은 긴 텍스트의 예시입니다. 여러 줄에 걸쳐 텍스트를 입력할 수 있으며, 각 줄마다 자동으로 줄바꿈이 됩니다. 사용자가 입력한 내용을 확인할 수 있도록 글자 수 카운터도 함께 표시됩니다.'
    );
    return (
      <div className="w-[360px]">
        <TextArea {...args} value={val} onChange={(e) => setVal(e.target.value)} />
      </div>
    );
  },
};
