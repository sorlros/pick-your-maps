import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'

const UserName = () => {
  const jwtToken = localStorage.getItem("token");
  const [name, setName] = useState<string>("");

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

  useEffect(() => {
      extractName();
    }, []);
  
  return (
    <li className="py-2 px-4 text-sm hover:bg-gray-100">{name}</li>
  )
}

export default UserName