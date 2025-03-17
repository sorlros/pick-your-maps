"use client";

import React from "react";
import Header from "./components/Header";
import MapComponent from "./components/Map";
import NoteEditor from "./components/Memo";
import { useMemoStore } from "./store/useMemoStore";
import MemoContainer from "./components/memo/Container";

export default function Home() {
  const isOpen = useMemoStore((state) => state.isOpen)

  return ( 
    <>
      <div className="relative w-screen h-screen justify-center">
        <MapComponent />
        <div className="w-full absolute mx-auto top-0 px-6 py-8">
          <Header />
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {isOpen && <MemoContainer />}
        </div>
      </div>
    </>
  );
}
