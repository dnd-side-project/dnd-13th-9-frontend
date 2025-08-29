export type PlaceTag =
  | 'ADVANTAGE'
  | 'DISADVANTAGE'
  | 'CONVENIENCE'
  | 'TRANSPORTATION'
  | 'SECURITY'
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

export type NearbyMemoById = NearbyMemo & {
  id: number;
  imageUrls: string[];
  folderName: string;
};

export type ApiResponse<T> = {
  code: string;
  message: string;
  data: T;
};

export type CreateNearbyMemoResponse = {
  code: string;
  message: string;
  data: {
    placeMemoId: number;
  };
};
