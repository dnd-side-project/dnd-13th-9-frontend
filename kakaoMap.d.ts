// types/kakao.d.ts
interface Window {
  kakao: typeof kakao;
}

declare const kakao: {
  maps: {
    Map: new (container: HTMLElement, options: { center: LatLng; level: number }) => MapInstance;
    LatLng: new (lat: number, lng: number) => LatLng;
    Marker: new (options: { map: MapInstance; position: LatLng }) => MarkerInstance;
    InfoWindow: new (options: { content: string }) => InfoWindowInstance;
    load: (callback: () => void) => void;
  };
};

interface LatLng {
  getLat: () => number;
  getLng: () => number;
}

interface MapInstance {
  setCenter: (latlng: LatLng) => void;
}

interface MarkerInstance {}

interface InfoWindowInstance {
  open: (map: MapInstance, marker: MarkerInstance) => void;
}
