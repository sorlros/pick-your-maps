// "use client";

// import React, { useEffect } from 'react'

// const PreventReloadGoogleMapApi = (autocompleteRef, place) => {
//   useEffect(() => {
//     if (document.querySelector("script[src*='maps.googleapis.com']")) {
//       return; // ✅ 이미 로드된 경우 중복 추가 방지
//     }
  
//     const script = document.createElement("script");
//     script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
//     script.async = true;
//     document.head.appendChild(script);
  
//     script.onload = () => {
//       if (!window.google || !autocompleteRef.current) return;
//       const autocomplete = new window.google.maps.places.Autocomplete(
//         autocompleteRef.current,
//         { types: ["geocode"] }
//       );
  
//       autocomplete.addListener("place_changed", () => {
//         const selectedPlace = autocomplete.getPlace();
//         setPlace({
//           name: selectedPlace.name,
//           formatted_address: selectedPlace.formatted_address,
//         });
//       });
//     };
//   }, []);

//   return {
//     name, formatted_address
//   }
// }

// export default PreventReloadGoogleMapApi