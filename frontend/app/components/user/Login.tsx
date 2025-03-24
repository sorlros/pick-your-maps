"use client";

import { useAuthStore } from '@/store/authStore';
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  const handleLogin = () => {
    // 로그인 API 호출 예시
    if (email && password) {
      // 로그인 성공 후 상태 업데이트
      setIsLoggedIn(true);
      alert('로그인 성공');
    } else {
      alert('이메일과 비밀번호를 입력해주세요');
    }
  };

  const handleLogout = () => {
    // 로그아웃 상태로 설정
    setIsLoggedIn(false);
    alert('로그아웃 성공');
  };

  return (
    <div className="flex w-[60%] h-[70%] justify-center items-center bg-neutral-300">
      <Button
        onClick={() => {
          // 로그인 상태일 때만 모달을 띄우기
          if (isLoggedIn) {
            handleLogout();
          } else {
            alert('로그인 모달 열기');
          }
        }}
      >
        {isLoggedIn ? '로그아웃' : '로그인'}
      </Button>

      {!isLoggedIn && (
        <div className="w-full h-full">
          <div className="modal-content">
            <h2>로그인</h2>
            <form>
              <Input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="button" onClick={handleLogin}>
                로그인
              </Button>
            </form>
            <Button onClick={() => alert('회원가입 페이지로 이동')}>회원가입</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login