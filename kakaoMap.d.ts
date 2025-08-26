type Window = {
  kakao: typeof kakao;
};

declare const kakao: {
  maps: {
    Map: new (container: HTMLElement, options: { center: LatLng; level: number }) => MapInstance;
    LatLng: new (lat: number, lng: number) => LatLng;
    Marker: new (options: { map: MapInstance; position: LatLng }) => MarkerInstance;
    InfoWindow: new (options: { content: string }) => InfoWindowInstance;
    CustomOverlay: new (options: {
      content: HTMLElement;
      position: LatLng;
      xAnchor?: number;
      yAnchor?: number;
      zIndex?: number;
    }) => CustomOverlayInstance;
    load: (callback: () => void) => void;
    services: {
      Geocoder: new () => GeocoderInstance;
      Status: {
        OK: string;
        ERROR: string;
        ZERO_RESULT: string;
      };
    };
  };
};

type LatLng = {
  getLat: () => number;
  getLng: () => number;
};

type MapInstance = {
  setCenter: (latlng: LatLng) => void;
};

type MarkerInstance = {
  setMap: (map: MapInstance | null) => void;
  setPosition: (position: LatLng) => void;
};

type InfoWindowInstance = {
  open: (map: MapInstance, marker: MarkerInstance) => void;
};

type CustomOverlayInstance = {
  setMap: (map: MapInstance | null) => void;
  setPosition: (position: LatLng) => void;
};

type GeocoderInstance = {
  coord2Address: (
    lng: number,
    lat: number,
    callback: (result: GeocoderResult[], status: string) => void
  ) => void;
};

type GeocoderResult = {
  address: {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_h_name: string;
  };
};
