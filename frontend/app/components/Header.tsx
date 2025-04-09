import React from 'react'
import PlacesSearch from './PlaceSearch'
import LoginButton from './user/LoginButton'
import { useAuthStore } from '@/store/useAuthStore'
import UserProfile from './user/UserProfile'

const Header = () => {
  const isLogin = useAuthStore((state) => state.isLoggedIn);

  return (
    <div className="flex justify-center md:justify-between items-center sm:gap-x-4 relative top-8 sm:top-0">
      <div className="flex w-full h-[56px] bg-white rounded-xl items-center">
        <PlacesSearch />
      </div>
      <div className="mt-2 sm:mt-0">
        {isLogin ? (
          <UserProfile />
        ) : (
          <LoginButton />
        )}
      </div>
    </div>
  )
}

export default Header
