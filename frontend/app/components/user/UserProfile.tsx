import Image from "next/image";
import React, { useState } from "react"
import Logout from "./Logout";
import UserName from "./UserName";
import UserPlaces from "./UserPlaces";

const UserProfile = () => {
  const randomSeed = Math.random().toString(36).substring(7); // 랜덤 문자열 생성
  const imageUrl = `https://robohash.org/${randomSeed}?size=100x100`;
  
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleOpenMenu = () => {
    setOpenMenu((prev) => !prev);
  }

  return (
    <div className="flex items-center space-x-4 relative cursor-pointer" onClick={handleOpenMenu}>
      <div className="flex flex-col items-center justify-center w-[50px] h-[50px] bg-amber-600 rounded-lg">
        <Image src={imageUrl} alt="랜덤 프로필 이미지" width={50} height={50} className="rounded-full z-20" />
      </div>

      <div
        className={`absolute top-full left-0 mt-2 w-[150px] p-4 bg-white border rounded-lg shadow-lg transition-all duration-500 ease-in-out transform ${openMenu ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}`}
      >
        {openMenu && (
          <ul>
            <UserName />
            <UserPlaces />
            <Logout />
          </ul>
        )}
      </div>
    </div>
  )
}

export default UserProfile;