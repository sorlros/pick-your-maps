import React, { useEffect } from 'react'
import FlagIcon from '@mui/icons-material/Flag';

interface MapState {
  lat: number,
  lng: number
}

const Marker = ({position}: {position: MapState}) => {
  useEffect(() => {
    console.log(position)
  }, [position])

  return (
    <div className="flex justify-center">
      <FlagIcon color="primary" fontSize="large" />
    </div>
  )
}

export default Marker