"use client";

import React, { useEffect } from "react";
import Header from "./components/Header";
import MapComponent from "./components/Map";

export default function Home() {
  useEffect(() => {
    // 구글 맵 API가 이미 로드되었는지 확인
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = () => {
        console.log("Google Maps API has been loaded.");
      };
      document.head.appendChild(script);
    }
  }, []);

  return ( 
    <>
      <div className="relative w-screen h-screen justify-center">
        <MapComponent />
        
        <div className="w-full absolute mx-auto top-0 px-6 py-8">
          <Header />
        </div>
      </div>
    </>
  );
}
