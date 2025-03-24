import React from 'react'
import PlacesSearch from './PlaceSearch'
import Login from './user/Login'

const Header = () => {
  return (
    <div className="flex w-[70vw] h-[56px] bg-white rounded-xl items-center">
      <PlacesSearch />
      <Login />
      {/* <Register /> */}
    </div>
  )
}

export default Header