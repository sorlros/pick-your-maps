import React from 'react'
import PlacesSearch from './PlaceSearch'
import LoginButton from './user/LoginButton'
import { useAuthStore } from '@/store/useAuthStore'
import UserProfile from './user/UserProfile'

const Header = () => {
  const isLogin = useAuthStore((state) => state.isLoggedIn);

  return (
    <div className="flex gap-x-4">
      <div className="flex w-full h-[56px] bg-white rounded-xl items-center">
        <PlacesSearch />
      </div>
      <div>
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