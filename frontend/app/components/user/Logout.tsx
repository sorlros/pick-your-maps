import { useAuthStore } from '@/store/useAuthStore';
import React from 'react'
import { toast } from 'sonner';

const Logout = () => {
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const setUserId = useAuthStore((state) => state.setUserId);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserId("");
    toast.success("로그아웃 성공");
  }

  return (
    <li onClick={handleLogout} className="py-2 px-4 text-sm cursor-pointer hover:bg-gray-100">로그아웃</li>
  )
}

export default Logout