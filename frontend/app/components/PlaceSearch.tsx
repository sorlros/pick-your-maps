"use client";

import { useState, useEffect, useRef } from "react";
import { LoadScript } from "@react-google-maps/api";
import { useMapStore } from "@/store/useMapStore";

interface PlaceResult {
  name?: string;
  formatted_address?: string;
}

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
const LIBRARIES: ("places")[] = ["places"];

const PlacesSearch = () => {
  const [query, setQuery] = useState<string>("");
  const [, setPlace] = useState<PlaceResult | null>(null);
  const autocompleteRef = useRef<HTMLInputElement | null>(null);
  const autocompleteInstance = useRef<google.maps.places.Autocomplete | null>(null);
  const setCoordinate = useMapStore((state) => state.setCoordinate);

  useEffect(() => {
    if (!window.google || !autocompleteRef.current) return;

    if (!autocompleteInstance.current) {
      autocompleteInstance.current = new window.google.maps.places.Autocomplete(
        autocompleteRef.current,
        { types: ["geocode"] }
      );

      autocompleteInstance.current.addListener("place_changed", () => {
        const selectedPlace = autocompleteInstance.current?.getPlace();
        if (selectedPlace && selectedPlace.geometry?.location) {
          const newCenter = {
            lat: selectedPlace.geometry.location.lat(),
            lng: selectedPlace.geometry.location.lng(),
          }
          setCoordinate(newCenter);
          setPlace({
            name: selectedPlace.name,
            formatted_address: selectedPlace.formatted_address,
          });
        }
      });
    }
  }, [query]);

  return (
    <LoadScript googleMapsApiKey={API_KEY} libraries={LIBRARIES}>
      <div className="w-full px-4 py-2 sm:py-4 max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
        <input
          ref={autocompleteRef}
          type="text"
          placeholder="장소를 검색하세요"
          className="w-full p-3 sm:p-4 text-sm sm:text-base border-none focus:border-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </LoadScript>
  );
};

export default PlacesSearch;
