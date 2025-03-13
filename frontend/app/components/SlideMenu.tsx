import React, { useState } from 'react'
import EditNoteIcon from '@mui/icons-material/EditNote';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

const SlideMenu = () => {
  const [click, setClick] = useState<boolean>(false);

  const handleClick = () => {
    setClick(!click);
  }

  return (
    <div
      className={`flex transition-all duration-300 z-[9999] space-x-2 mb-20`}
       
      onClick={() => handleClick()}
    >
      <div className="w-[30px] h-[30px] rounded-full bg-yellow-400 border-1 border-black relative">
        <EditNoteIcon fontSize="medium" className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="w-[30px] h-[30px] rounded-full bg-yellow-300 relative">
        <StarHalfIcon fontSize="medium" className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="w-[30px] h-[30px] rounded-full bg-neutral-400 relative">
        <BookmarkBorderIcon fontSize="medium" className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        {/* 북마크시 BookmarkAddedIcon로 대체할 것 */}
      </div>
      
      
      
    </div>
  )
}

export default SlideMenu