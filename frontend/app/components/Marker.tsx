import React, { useEffect } from 'react'
import FlagIcon from '@mui/icons-material/Flag';
import { useMapStore } from '@/store/useMapStore';

interface MapState {
  lat: number,
  lng: number
}

const Marker = ({position}: {position: MapState}) => {
  const setCoordinate = useMapStore((state) => state.setCoordinate);
  
  useEffect(() => {
    setCoordinate(position);
    console.log(position)
  }, [position])

  return (
    <div className="flex justify-center">
      <FlagIcon color="primary" fontSize="large" />
    </div>
  )
}

export default Marker