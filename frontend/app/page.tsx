"use client";

import React from "react";
import Header from "./components/Header";
import MapComponent from "./components/Map";
import NoteEditor from "./components/Memo";

export default function Home() {
  return ( 
    <>
      <div className="relative w-screen h-screen justify-center">
        <MapComponent />
        <NoteEditor />
        
        <div className="w-full absolute mx-auto top-0 px-6 py-8">
          <Header />
        </div>
      </div>
    </>
  );
}
