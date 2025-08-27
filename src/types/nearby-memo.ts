export type PlaceTag =
  | 'ADVANTAGE'
  | 'DISADVANTAGE'
  | 'CONVENIENCE'
  | 'TRANSPORTATION'
  | 'SECURUTY'
  | 'NOISE';

export type NearbyMemo = {
  title: string;
  description: string;
  placeTag: PlaceTag;
  address: string;
  latitude: number;
  longitude: number;
  folderId: number;
};

export type NearbyMemoInputField = {
  key: keyof NearbyMemo;
  label: string;
  placeholder?: string;
  required?: boolean;
  unit?: string;
};
