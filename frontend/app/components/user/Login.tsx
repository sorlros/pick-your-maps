"use client";

import { useAuthStore } from "@/store/authStore";
import React, { useState } from "react"
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from 'next/image';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  const handleLogin = () => {
    // 로그인 API 호출 예시
    if (email && password) {
      // 로그인 성공 후 상태 업데이트
      setIsLoggedIn(true);
      alert("로그인 성공");
    } else {
      alert("이메일과 비밀번호를 입력해주세요");
    }
  };

  // const handleLogout = () => {
  //   // 로그아웃 상태로 설정
  //   setIsLoggedIn(false);
  //   alert("로그아웃 성공");
  // };

  return (
    <div className="flex justify-center w-full h-full bg-white rounded-lg">
      <div className="flex flex-col min-w-[70%] gap-y-3 mt-8">
        <div className="">
          <h2>로그인</h2>
        </div> 
        <div>
          <Input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-between">
          <div>
            <Button type="button" onClick={handleLogin}>
              로그인
            </Button>
          </div>
          <div>
            <Button onClick={() => alert("회원가입 페이지로 이동")}>회원가입</Button>
          </div>
        </div>
        <div className="w-full">
          <Image
            alt="로그인창 이미지"
            src="/images/LoginModal.png"
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  )
}

export default Login