import React, { useState } from 'react'

const SlideMenu = () => {
  const [click, setClick] = useState<boolean>(false);

  const handleClick = () => {
    setClick(!click);
  }

  return (
    <div
      className={`transition-all duration-300 ${click ? "flex w-[240px] h-[20px] bg-amber-500 items-center justify-center rounded-l-full rounded-r-full" : "flex w-[20px] h-[20px] bg-amber-500 items-center justify-center rounded-full"}`}
      onClick={() => handleClick()}
    >
      <div>
        asdasd
      </div>
    </div>
  )
}

export default SlideMenu