import React from 'react'
import PlacesSearch from './PlaceSearch'
import LoginButton from './user/LoginButton'

const Header = () => {
  return (
    <div className="flex w-[70vw] h-[56px] bg-white rounded-xl items-center">
      <PlacesSearch />
      <LoginButton />
      {/* <Register /> */}
    </div>
  )
}

export default Header