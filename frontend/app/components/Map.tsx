"use client";

import { GoogleMap, LoadScript } from "@react-google-maps/api";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
const containerStyle = {
  width: "100%",
  height: "100%",
  style: "absolute inset-0 w-full h-full"
};
  
const center = {
  lat: 37.5665, // 서울 위도
  lng: 126.9780, // 서울 경도
};

const MapComponent = () => {
  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
        {/* 여기에 마커 추가 가능 */}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
