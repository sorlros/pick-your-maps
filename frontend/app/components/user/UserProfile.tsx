import Image from "next/image";
import React, { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode";
import Logout from "./Logout";
import MyPlaces from "./MyPlaces";

const UserProfile = () => {
  const randomSeed = Math.random().toString(36).substring(7); // 랜덤 문자열 생성
  const imageUrl = `https://robohash.org/${randomSeed}?size=100x100`;
  const jwtToken = localStorage.getItem("token");
  // console.log("UserProfile에서 받은 토큰값: ", jwtToken);

  const [name, setName] = useState<string>("");
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const getUserEmail = () => {
    if (!jwtToken) return null;

    try {
      const decoded = jwtDecode(jwtToken) as { email: string };
      // console.log("decoded.email: ", decoded.email);
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

  const handleOpenMenu = () => {
    setOpenMenu((prev) => !prev);
  }

  useEffect(() => {
    extractName();
  }, []);

  return (
    <div className="flex items-center space-x-4 relative cursor-pointer" onClick={handleOpenMenu}>
      <div className="flex flex-col items-center justify-center w-[50px] h-[50px] bg-amber-600 rounded-lg">
      <Image src={imageUrl} alt="랜덤 프로필 이미지" width={50} height={50} className="rounded-full z-20" />
      {/* <span className="text-[12px] font-semibold">{name}</span> */}
      </div>

      <div
        className={`absolute top-full left-0 mt-2 w-[150px] p-4 bg-white border rounded-lg shadow-lg transition-all duration-500 ease-in-out transform ${openMenu ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}`}
      >
        {openMenu && (
          <ul>
            <li className="py-2 px-4 text-sm cursor-pointer hover:bg-gray-100">Profile</li>
            <MyPlaces />
            <Logout />
          </ul>
        )}
      </div>
    </div>
  )
}

export default UserProfile;