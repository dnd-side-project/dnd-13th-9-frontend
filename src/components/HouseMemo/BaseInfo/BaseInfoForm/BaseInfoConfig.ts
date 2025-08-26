import { Feeling, HouseMemoInputField } from '@/types/house-memo';
import { IconName } from '@/components/ui/assets';

export const feelingOptions: {
  type: Feeling;
  iconName: IconName;
  activeColor: 'primary' | 'secondary' | 'status-red';
}[] = [
  { type: 'GOOD', iconName: 'happyFill', activeColor: 'primary' },
  { type: 'SOSO', iconName: 'soSoFill', activeColor: 'secondary' },
  { type: 'BAD', iconName: 'angryFill', activeColor: 'status-red' },
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
    key: 'referenceUrl',
    label: '참고 링크',
    placeholder: '부동산 앱에서 복사한 매물 링크를 붙여보세요.',
  },
  {
    key: 'address',
    label: '주소',
    placeholder: '현재 위치 버튼을 클릭하거나 지도를 터치하여 주소를 선택하세요.',
    required: true,
  },
  {
    key: 'detailAddress',
    label: '상세 주소',
    placeholder: '동/호수 등 상세 주소를 입력하세요.',
  },
  { key: 'managementFee', label: '관리비', placeholder: '예) 9', unit: '만원' },
  { key: 'moveInInfo', label: '입주 가능 시기', placeholder: '예) 9월 초' },
];

export const contractOptions: { text: string; value: string }[] = [
  { text: '월세', value: 'MONTHLY_RENT' },
  { text: '전세', value: 'JEONSE' },
  { text: '매매', value: 'PURCHASE' },
];

export const houseOptions: { text: string; value: string }[] = [
  { text: '오피스텔', value: 'OFFICETEL' },
  { text: '원룸', value: 'ONEROOM' },
  { text: '아파트', value: 'APARTMENT' },
  { text: '빌라', value: 'VILLA' },
  { text: '코리빙', value: 'COLIVING' },
  { text: '고시원', value: 'GOSIWON' },
  { text: '하숙', value: 'BOARDING' },
  { text: '기타', value: 'ETC' },
];
