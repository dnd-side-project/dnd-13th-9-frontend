export type PlaceTag =
  | 'ADVANTAGE'
  | 'DISADVANTAGE'
  | 'CONVENIENCE'
  | 'TRANSPORTATION'
  | 'SECURUTY'
  | 'NOISE';

export type PlaceAddress = {
  x: string;
  y: string;
  address: string;
  place_name: string;
};

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
