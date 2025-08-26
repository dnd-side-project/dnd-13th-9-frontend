import { NearbyMemoInputField, PlaceTag } from '@/types/nearby-memo';

export const placeTagOptions: { text: string; value: PlaceTag }[] = [
  { text: '장점', value: 'STRENGTH' },
  { text: '단점', value: 'WEAKNESS' },
  { text: '편의시설', value: 'CONVENIENCE' },
  { text: '교통', value: 'TRANSPORT' },
  { text: '치안', value: 'SAFETY' },
  { text: '소음', value: 'NOISE' },
];

export const contractOptions: { text: string }[] = [
  { text: '월세' },
  { text: '전세' },
  { text: '매매' },
];

export const InputFields: NearbyMemoInputField[] = [
  {
    key: 'title',
    label: '장소명',
    placeholder: '지도에 표시될 제목을 입력하세요.',
    required: true,
  },
  { key: 'description', label: '메모', placeholder: '기억해두고 싶은 정보와 느낌을 작성하세요.' },
  {
    key: 'address',
    label: '주소',
    placeholder: '주소를 입력하면 지도에 표시돼요.',
    required: true,
  },
];
