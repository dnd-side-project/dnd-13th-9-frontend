export type ViewModel = {
  id: string; // prefixed id: prop_{id} | near_{id}
  type: 'PROPERTY' | 'NEARBY';
  title: string;
  memo: string | null;
  address: string | null;
  tag:
    | 'ADVANTAGE'
    | 'DISADVANTAGE'
    | 'CONVENIENCE'
    | 'TRANSPORTATION'
    | 'SECURITY'
    | 'NOISE'
    | null;
  feeling?: 'GOOD' | 'SOSO' | 'BAD';
  contractType?: 'MONTHLY_RENT' | 'JEONSE' | 'PURCHASE' | null;
  depositBig?: number | null;
  depositSmall?: number | null;
  managementFee?: number | null;
  lat: number;
  lng: number;
  images: { url: string }[];
  thumbnail: string | null;
  createdAt: string; // ISO
};

// 구/신 placeTag 모두 표준화
export const toStdPlaceTag = (raw?: string | null): ViewModel['tag'] => {
  const map: Record<string, ViewModel['tag']> = {
    ADVANTAGE: 'ADVANTAGE',
    DISADVANTAGE: 'DISADVANTAGE',
    CONVENIENCE: 'CONVENIENCE',
    TRANSPORTATION: 'TRANSPORTATION',
    SECURITY: 'SECURITY',
    NOISE: 'NOISE',
  };
  return raw ? (map[raw] ?? null) : null;
};

export type RecordSummaryDto = {
  id: number;
  imageUrl?: string | null;
  imageUrls?: Array<string | null> | null;
  recordType: 'PROPERTY';
  feeling: 'GOOD' | 'SOSO' | 'BAD';
  title: string;
  contractType: 'MONTHLY_RENT' | 'JEONSE' | 'PURCHASE';
  depositBig: number | null;
  depositSmall: number | null;
  managementFee: number | null;
  memo: string | null;
  locationTag: string | null;
  latitude: number;
  longitude: number;
  createdAt: string;
};

export type PlaceMemoDto = {
  id?: number;
  placeMemoId?: number;
  title: string;
  placeTag: 'GOOD' | 'BAD' | 'CONVENIENCE' | 'TRAFFIC' | 'TRANSPORTATION' | 'SECURITY' | 'NOISE';
  description: string | null;
  address: string | null;
  latitude: number | string;
  longitude: number | string;
  images?: string[] | null;
  imageUrls?: string[] | null;
  createdAt?: string;
};

export const mapProperty = (dto: RecordSummaryDto): ViewModel => {
  const urls: string[] = Array.isArray(dto.imageUrls)
    ? (dto.imageUrls.filter(Boolean) as string[])
    : dto.imageUrl
      ? [dto.imageUrl]
      : [];
  const thumbnail = urls[0] ?? null;
  return {
    id: `prop_${dto.id}`,
    type: 'PROPERTY',
    title: dto.title,
    memo: dto.memo,
    address: null,
    tag: null, // locationTag를 쓰려면 toStdPlaceTag(dto.locationTag)
    feeling: dto.feeling,
    contractType: dto.contractType,
    depositBig: dto.depositBig ?? null,
    depositSmall: dto.depositSmall ?? null,
    managementFee: dto.managementFee ?? null,
    lat: dto.latitude,
    lng: dto.longitude,
    images: urls.map((url) => ({ url })),
    thumbnail,
    createdAt: dto.createdAt,
  };
};

export const mapNearby = (dto: PlaceMemoDto): ViewModel => {
  const imgs = (dto.images ?? dto.imageUrls ?? []).filter(Boolean) as string[];
  const idNum = dto.id ?? dto.placeMemoId ?? 0;
  const latNum = typeof dto.latitude === 'string' ? parseFloat(dto.latitude) : dto.latitude;
  const lngNum = typeof dto.longitude === 'string' ? parseFloat(dto.longitude) : dto.longitude;
  return {
    id: `near_${idNum}`,
    type: 'NEARBY',
    title: dto.title,
    memo: dto.description ?? null,
    address: dto.address ?? null,
    tag: toStdPlaceTag(dto.placeTag),
    lat: latNum,
    lng: lngNum,
    images: imgs.map((url) => ({ url })),
    thumbnail: imgs[0] ?? null,
    createdAt: dto.createdAt ?? new Date(0).toISOString(),
  };
};

export const normalizeMemos = (payload: {
  recordSummaryResponses: RecordSummaryDto[];
  queryPlaceMemoResponses: PlaceMemoDto[];
}): ViewModel[] => {
  const a = (payload.recordSummaryResponses ?? []).map(mapProperty);
  const b = (payload.queryPlaceMemoResponses ?? []).map(mapNearby);
  const merged = [...a, ...b];
  merged.sort((x, y) => +new Date(y.createdAt) - +new Date(x.createdAt));
  return merged;
};
