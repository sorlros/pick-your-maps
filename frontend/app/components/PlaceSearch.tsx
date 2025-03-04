"use client";

import { useState, useEffect, useRef } from "react";
// import Script from "next/script"; // ✅ next/script 사용

interface PlaceResult {
  name?: string;
  formatted_address?: string;
}

const PlacesSearch = () => {
  const [query, setQuery] = useState<string>(""); // 검색어 상태
  const [place, setPlace] = useState<PlaceResult | null>(null); // 선택한 장소 정보
  const autocompleteRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!window.google || !autocompleteRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      autocompleteRef.current,
      { types: ["geocode"] } // 또는 ["establishment"] (장소 검색)
    );

    autocomplete.addListener("place_changed", () => {
      const selectedPlace = autocomplete.getPlace();
      setPlace({
        name: selectedPlace.name,
        formatted_address: selectedPlace.formatted_address,
      });
    });
  }, []);

  return (
    <>
      {/* ✅ Google Maps API를 next/script로 추가 */}
      {/* <Script
        strategy="afterInteractive"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
      /> */}
      
      <div className="w-full max-w-md mx-auto p-4">
        <input
          ref={autocompleteRef}
          type="text"
          placeholder="장소를 검색하세요"
          className="w-full p-2 border rounded"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {place && (
          <div className="mt-4 p-4 border rounded bg-gray-100">
            <h2 className="text-lg font-bold">{place.name}</h2>
            <p>{place.formatted_address}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default PlacesSearch;
