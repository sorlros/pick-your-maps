"use client";

import { useAuthStore } from "@/store/useAuthStore";
import React, { useState } from "react"
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from 'next/image';
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState<string>("");
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);

  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const onClose = useAuthStore((state) => state.onClose);
  const setUserId = useAuthStore((state) => state.setUserId);

  const handleLogin = async () => {
    if (email && password) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_TO_BACKEND}/api/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          console.error(response);
          throw new Error("로그인 실패");
        }
        // cors 에러 발생중
  
        const data = await response.json();
        // console.log("loginData", data)

        if (response.status === 200) {
          localStorage.setItem("token", data.token);
          // console.log("userId", data.userId);
          setUserId(data.userId as string);
          setIsLoggedIn(true);
          onClose();
          toast.success(`로그인 성공`);
        } else {
          console.log(data.error);
          toast.error("로그인 실패했습니다");
        }
        setIsLoggedIn(true);
        // alert("로그인 성공");
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("이메일과 비밀번호를 입력해주세요");
    }
  };

  const handleModeToggle = () => {
    setIsLoginMode((prevMode) => !prevMode);
    console.log("mode", isLoginMode)
  }
  
  const handleRegister = async () => {
    if (email && (password === checkPassword)) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_TO_BACKEND}/api/user/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
          throw new Error("회원가입 실패");
        }
        alert("회원가입 완료");
        setIsLoginMode(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("a")
    }
  }

  const handleClose = () => {
    onClose();
  }

  return (
    <div className="flex justify-center min-w-full lg:h-full md:h-[70%] sm:h-[65%] bg-white rounded-lg max-sm:pb-3">
      <div className="flex flex-col min-w-[70%] gap-y-3 mt-8">
        <div className="flex justify-between w-full items-center">
          <div className="">
            <h2>로그인</h2>
          </div>
          <div className="flex items-center justify-center cursor-pointer w-[24px] h-[24px] rounded-full hover:bg-neutral-300">
            <span className="text-[16px]" onClick={handleClose}>✖</span>
          </div>
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
        {!isLoginMode && (
          <div>
            <Input
              type="password"
              placeholder="비밀번호 재입력"
              value={checkPassword}
              onChange={(e) => setCheckPassword(e.target.value)}
              required
            />
          </div>
        )}
        <div className="flex justify-end space-x-2">
          {isLoginMode ? (
            <div>
              <Button type="button" onClick={handleLogin}>
                로그인
              </Button>
            </div>
          ) : (
            <div>
              <Button 
                type="button" onClick={handleModeToggle}>
                로그인으로 돌아가기
              </Button>
            </div>
          )}
          
          {isLoginMode ? (
            <div>
            <Button 
              onClick={handleModeToggle}>회원가입</Button>
          </div>
          ) : (
            <div>
            <Button 
              onClick={handleRegister}>등록</Button>
          </div>
          )}
        </div>
        <div className="w-full relative lg:h-50 hidden md:block mt-6 md:mt-1 md:h-30">
          <Image
            alt="로그인창 이미지"
            src="/images/LoginModal.png"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default Login