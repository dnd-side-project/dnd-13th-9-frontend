import { Feeling, HouseMemoInputField } from '@/types/house-memo';
import { IconName } from '@/components/ui/assets';

export const feelingOptions: {
  type: Feeling;
  iconName: IconName;
  activeColor: 'primary' | 'secondary' | 'black';
}[] = [
  { type: 'HAPPY', iconName: 'happyFill', activeColor: 'primary' },
  { type: 'SOSO', iconName: 'soSoFill', activeColor: 'secondary' },
  { type: 'ANGRY', iconName: 'angryFill', activeColor: 'black' },
];

type DoubleInputFieldKey = 'depositBig' | 'depositSmall';

export const doubleInputFields: { key: DoubleInputFieldKey; placeholder: string; unit?: string }[] =
  [
    { key: 'depositBig', placeholder: '예) 1', unit: '억' },
    { key: 'depositSmall', placeholder: '예) 1000', unit: '만원' },
  ];

export const InputFields: HouseMemoInputField[] = [
  {
    key: 'propertyName',
    label: '매물명',
    placeholder: '지도에 표시될 제목을 입력하세요.',
    required: true,
  },
  { key: 'memo', label: '메모', placeholder: '기억해두고 싶은 정보와 느낌을 작성하세요.' },
  {
    key: 'referenceLink',
    label: '참고 링크',
    placeholder: '부동산 앱에서 복사한 매물 링크를 붙여보세요.',
  },
  {
    key: 'address',
    label: '주소',
    placeholder: '지도에 표시될 제목을 입력하세요.',
    required: true,
  },
  {
    key: 'detailedAddress',
    label: '상세 주소',
    placeholder: '동/호수 등 상세 주소를 입력하세요.',
  },

  { key: 'monthlyRent', label: '월세', placeholder: '예) 9', unit: '만원', required: true },
  { key: 'maintenanceFee', label: '관리비', placeholder: '예) 9', unit: '만원' },
  { key: 'availableDate', label: '입주 가능 시기', placeholder: '예) 9월 초' },
];

export const contractOptions: { text: string }[] = [
  { text: '월세' },
  { text: '전세' },
  { text: '매매' },
];

export const houseOptions: { text: string }[] = [
  { text: '오피스텔' },
  { text: '원룸' },
  { text: '아파트' },
  { text: '빌라' },
  { text: '코리빙' },
  { text: '고시원' },
  { text: '하숙' },
  { text: '기타' },
];
