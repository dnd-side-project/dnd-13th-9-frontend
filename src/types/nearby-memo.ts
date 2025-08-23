export type PlaceTag = '장점' | '단점' | '편의시설' | '교통' | '치안' | '소음';

export type PlaceAddress = {
  x: string;
  y: string;
  address_name: string;
  place_name: string;
};

export type NearbyMemo = {
  placeName: string; // 장소명
  memo: string;
  tags: PlaceTag;
  address: PlaceAddress | null;
};

export type NearbyMemoInputField = {
  key: keyof NearbyMemo;
  label: string;
  placeholder?: string;
  required?: boolean;
  unit?: string;
};
