"use client";

import React from "react";
import Header from "./components/Header";
import MapComponent from "./components/Map";
// import NoteEditor from "./components/Memo";
import { useMemoStore } from "./store/useMemoStore";
import MemoContainer from "./components/memo/Container";
import Login from "./components/user/Login";
import { useAuthStore } from "./store/authStore";

export default function Home() {
  const isOpenMemo = useMemoStore((state) => state.isOpen);
  const isOpenAuth = useAuthStore((state) => state.isOpen);

  return ( 
    <>
      <div className="w-screen h-screen flex flex-col">
      {/* 맵과 헤더 컨테이너 */}
      <div className={`relative flex-1 z-10 ${(isOpenMemo || isOpenAuth) ? "pointer-events-none" : ""}`}>
        <MapComponent />
        <div className="absolute top-0 left-0 w-full px-6 py-8">
          <Header />
        </div>
      </div>

      {(isOpenMemo || isOpenAuth) && (
        <div className="absolute inset-0 bg-black opacity-[50%] z-10 pointer-events-none" />
      )}
      
      <div className="absolute inset-0 flex justify-center items-center">
        {isOpenAuth && (
          <div className="w-[40%] max-md:w-[80%] h-[70%] z-20 pointer-events-auto">
            <Login />
          </div>
        )}

        {isOpenMemo && (
          <div className="absolute z-20 pointer-events-auto">
            <MemoContainer />
          </div>
        )}
      </div>

      {/* 로그인 및 메모 컨테이너 */}
      {/* <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        {isOpenAuth && (
          <div className={`w-[40%] h-[70%] pointer-events-auto`}>
          <Login />
        </div>
        )}
      
        {isOpenMemo && (
          <div className="absolute z-20">
            <MemoContainer />
          </div>
        )}
      </div> */}
    </div>
    </>
  );
}
