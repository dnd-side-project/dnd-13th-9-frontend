import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';

import { MapPin, type MemoType, type NearbyTag } from './MapPin';

type PreviewProps = {
  type: MemoType;
  nearTag?: NearbyTag;
  size?: number;
  active?: boolean;
};

function MapPinPreview({ type, nearTag, size = 64, active = false }: PreviewProps) {
  const hostRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!hostRef.current) return;
    hostRef.current.innerHTML = '';
    const node = MapPin({ type, nearTag, size, active });
    hostRef.current.appendChild(node);
  }, [type, nearTag, size, active]);

  return (
    <div
      style={{
        position: 'relative',
        width: 160,
        height: 120,
        background: '#F7F7F7',
        borderRadius: 12,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingBottom: 12,
      }}
    >
      <div ref={hostRef} />
    </div>
  );
}

const meta = {
  title: 'components/common/MapPin',
  component: MapPinPreview,
  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['PROPERTY', 'NEARBY'],
    },
    nearTag: {
      control: 'select',
      options: ['BAD', 'CONVENIENCE', 'GOOD', 'NOISE', 'SECURITY', 'TRAFFIC'],
    },
    size: { control: { type: 'range', min: 32, max: 96, step: 4 } },
    active: { control: 'boolean' },
  },
  args: {
    type: 'PROPERTY',
    nearTag: 'GOOD',
    size: 64,
    active: false,
  },
} satisfies Meta<typeof MapPinPreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <MapPinPreview {...args} />,
};

export const BothTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <MapPinPreview type="PROPERTY" size={64} />
      <MapPinPreview type="NEARBY" size={64} nearTag="GOOD" />
    </div>
  ),
};

export const NearbyTags: Story = {
  render: () => {
    const tags: NearbyTag[] = ['BAD', 'CONVENIENCE', 'GOOD', 'NOISE', 'SECURITY', 'TRAFFIC'];
    return (
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {tags.map((t) => (
          <div key={t} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <MapPinPreview type="NEARBY" size={64} nearTag={t} />
            <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>{t}</div>
          </div>
        ))}
      </div>
    );
  },
};
