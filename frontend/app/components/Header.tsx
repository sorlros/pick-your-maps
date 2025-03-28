import React from 'react'
import PlacesSearch from './PlaceSearch'
import LoginButton from './user/LoginButton'
import { useAuthStore } from '@/store/useAuthStore'
import UserProfile from './user/UserProfile'

const Header = () => {
  const isLogin = useAuthStore((state) => state.isLoggedIn);

  return (
    <div className="flex w-[70vw] h-[56px] bg-white rounded-xl items-center">
      <PlacesSearch />
      
      {isLogin ? (
        <UserProfile />
      ) : (
        <LoginButton />
      )}
      {/* <Register /> */}
    </div>
  )
}

export default Header