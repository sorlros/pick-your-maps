"use client";

import React, { useEffect } from "react";
import Header from "./components/Header";
import MapComponent from "./components/Map";
// import NoteEditor from "./components/Memo";
import { useMemoStore } from "./store/useMemoStore";
import MemoContainer from "./components/memo/Container";
import Login from "./components/user/Login";
import { useAuthStore } from "./store/useAuthStore";
import { toast } from "sonner";
import AllMemo from "./components/memo/AllMemo";
import { useAllMemoStore } from "./store/allMemoStore";

export default function Home() {
  const isOpenMemo = useMemoStore((state) => state.isOpen);
  const isOpenAuth = useAuthStore((state) => state.isOpen);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const closeMemo = useMemoStore((state) => state.onClose);
  const allMemoModal = useAllMemoStore((state) => state.isOpen)

  useEffect(() => {
    if (isOpenMemo && !isLoggedIn) {
      toast.error("로그인이 필요합니다");
      closeMemo();
    }
  }, [isOpenMemo, isLoggedIn]);

  return ( 
    <>
      <div className="w-screen h-screen flex flex-col overflow-hidden">
        <div className={`relative flex-1 z-10 ${(isOpenMemo || isOpenAuth) ? "pointer-events-none" : "pointer-events-auto"}`}>
          <MapComponent />
          <div className="w-[80%] h-[56px] sm:w-4/5 md:w-2/3 lg:w-1/2 absolute top-[24px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-8 z-20">
            <Header />
          </div>
        </div>

        {((isOpenMemo && isLoggedIn) || isOpenAuth) && (
          <div className="absolute inset-0 bg-black opacity-[50%] z-10 pointer-events-none" />
        )}
        
        <div className="absolute inset-0 flex justify-center items-center">
          {isOpenAuth && (
            <div className="w-[40%] max-md:w-[80%] h-[70%] z-20 pointer-events-auto">
              <Login />
            </div>
          )}

          {isOpenMemo && isLoggedIn ? (
            <div className="absolute z-20 pointer-events-auto">
              <MemoContainer />
            </div>
          ) : null }
        </div>

        {allMemoModal && (
          <div
            className={`
              absolute w-[80%] sm:w-[80%] md:w-[60%] lg:w-[40%] h-[70vh] z-30 
              top-1/2 left-1/2 -translate-x-1/2
              transition-transform duration-500 ease-in-out
              ${allMemoModal ? "-translate-y-1/2 opacity-100 pointer-events-auto" : "-translate-y-[200%] opacity-0 pointer-events-none"}
            `}
          >
            <AllMemo />
          </div>
        )}
        
         {/* {allMemoModal && (
          <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <AllMemo />
          </div>
        )} */}
      </div>
    </>
  );
}
