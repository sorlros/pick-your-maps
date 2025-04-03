import React, { useState } from 'react'
import EditNoteIcon from '@mui/icons-material/EditNote';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
// import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { useMemoStore } from '@/store/useMemoStore';

const SlideMenu = () => {
  const [click, setClick] = useState<boolean>(false);
  const memoModal = useMemoStore();

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setClick(!click);
  }

  const handleNote = (event: React.MouseEvent) => {
    event.stopPropagation();
    // console.log("123")
    memoModal.onOpen();
    console.log("memo", memoModal.isOpen)
  }

  return (
    <div
      className={`flex transition-all duration-300 z-[9999] space-x-2 mb-20`}
       
      onClick={handleClick}
    >
      <div 
        className="w-[30px] h-[30px] rounded-full bg-yellow-300 border-1 border-black relative"
        onClick={handleNote}
      >
        <EditNoteIcon fontSize="medium" className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="w-[30px] h-[30px] rounded-full bg-yellow-300 border-1 border-black relative">
        <StarHalfIcon fontSize="medium" className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="w-[30px] h-[30px] rounded-full bg-yellow-300 border-1 border-black relative">
        <BookmarkBorderIcon fontSize="medium" className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        {/* 북마크시 BookmarkAddedIcon로 대체할 것 */}
      </div>
      
      
      
    </div>
  )
}

export default SlideMenu