"use client";

import { useMapStore } from "@/store/useMapStore";
import { GoogleMap, LoadScript, OverlayView } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import Marker from "./Marker";
import SlideMenu from "./SlideMenu";

interface MapState {
    lat: number,
    lng: number
}

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
const LIBRARIES: ("places")[] = ["places"];
const containerStyle = {
  width: "100%",
  height: "100%",
  style: "absolute inset-0 w-full h-full"
};

const defaultCenter: MapState = {
  lat: 37.5665, // 서울 위도
  lng: 126.9780, // 서울 경도
};

const MapComponent = () => {
  const [mapCenter, setMapCenter] = useState<MapState>(defaultCenter);
  const [selectedLatLng, setSelectedLatLng] = useState<MapState>();
  const coordinate = useMapStore((state) => state.coordinate);

  useEffect(() => {
    setMapCenter(coordinate);
  }, [coordinate])

  const handleClickMap = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const clickedLat = event.latLng.lat();
      const clickedLng = event.latLng.lng();
      const newClickedMap = {
        lat: clickedLat,
        lng: clickedLng,
      }
      setSelectedLatLng(newClickedMap)
      // console.log("map: ", selectedLatLng);
    }
  }

  return (
    <LoadScript googleMapsApiKey={API_KEY} libraries={LIBRARIES}>
      <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={14} onClick={handleClickMap}>
        {/* 여기에 마커 추가 가능 */}
        {selectedLatLng && (
          <OverlayView
            position={selectedLatLng}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          > 
            <div className="relative">
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-full">
                <Marker position={selectedLatLng} />
                <div className="mt-2 justify-center">
                  <SlideMenu />
                </div>
              </div>
            </div>
        </OverlayView>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
