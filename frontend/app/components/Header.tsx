import React from 'react'
import PlacesSearch from './PlaceSearch'

const Header = () => {
  return (
    <div className="flex w-[70vw] h-[56px] bg-white rounded-xl items-center">
      <PlacesSearch />
    </div>
  )
}

export default Header