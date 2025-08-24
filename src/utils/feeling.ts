import type { IconName } from '@/components/ui/assets';
import type { Feeling as FrontendFeeling } from '@/types/house-memo';

export type BackendFeeling = 'GOOD' | 'SOSO' | 'BAD';

export type AnyFeeling = BackendFeeling | FrontendFeeling;

type NormalizedKind = 'GOOD' | 'SOSO' | 'BAD';

const FEELING_TO_KIND: Record<AnyFeeling, NormalizedKind> = {
  GOOD: 'GOOD',
  SOSO: 'SOSO',
  BAD: 'BAD',
  HAPPY: 'GOOD',
  ANGRY: 'BAD',
};

type FeelingMeta = {
  iconName: IconName;
  color: string;
};

const KIND_META: Record<NormalizedKind, FeelingMeta> = {
  GOOD: { iconName: 'happyFill', color: 'primary-50' },
  SOSO: { iconName: 'soSoFill', color: 'secondary' },
  BAD: { iconName: 'angryFill', color: '#FF6648' },
};

export function getFeelingMeta(feeling: AnyFeeling): FeelingMeta {
  const kind = FEELING_TO_KIND[feeling];
  return KIND_META[kind];
}

export function getFeelingIconName(feeling: AnyFeeling): IconName {
  return getFeelingMeta(feeling).iconName;
}

export function getFeelingColor(feeling: AnyFeeling): string {
  return getFeelingMeta(feeling).color;
}
