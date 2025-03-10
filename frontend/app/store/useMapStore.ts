import { create } from "zustand";

interface MapState {
  lat: number,
  lng: number
}

interface MapStore {
  coordinate: MapState,
  setCoordinate: (state: MapState) => void;
}

export const useMapStore = create<MapStore>((set) => ({
  coordinate: {
    lat: 37.5665, // 서울 위도
    lng: 126.9780, // 서울 경도
  },
  setCoordinate: (state: MapState) => {
    set({
      coordinate: {
        lat: state.lat,
        lng: state.lng,
      }
    })
  }
}));