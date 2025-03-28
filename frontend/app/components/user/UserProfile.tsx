import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";

const UserProfile = () => {
  const randomSeed = Math.random().toString(36).substring(7); // 랜덤 문자열 생성
  const imageUrl = `https://robohash.org/${randomSeed}?size=100x100`;
  const jwtToken = localStorage.getItem("token");
  console.log("UserProfile에서 받은 토큰값: ", jwtToken);

  const [name, setName] = useState<string>("");

  const getUserEmail = () => {
    if (!jwtToken) return null;

    try {
      const decoded = jwtDecode(jwtToken) as { email: string };
      console.log("decoded.email: ", decoded.email);
      return decoded.email;
    } catch (error) {
      console.error("jwt 토큰 디코딩 오류", error);
      return null;
    }
  }

  const extractName = () => {
    const email = getUserEmail();

    const getLocalPart = (value: string) => {
      return value.split("@")[0];
    };

    if (email) {
      const name = getLocalPart(email);
      setName(name);
    }
  }

  useEffect(() => {
    extractName();
  }, []);

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center justify-center w-[50px] h-[50px] bg-amber-600 rounded-full z-10">
      <Image src={imageUrl} alt="랜덤 프로필 이미지" width={50} height={50} className="rounded-full z-20" />
      <span className="text-lg font-semibold">{name}</span>
      </div>
    </div>
  )
}

export default UserProfile;