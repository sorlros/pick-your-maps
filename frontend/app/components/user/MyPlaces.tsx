import useUserMemoStore from '@/store/useUserMemoStore';
import React, { useState } from 'react'

const MyPlaces = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setUserMemoData = useUserMemoStore((state) => state.setUserMemo);

  const handleLoadMyPlaces = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_TO_BACKEND}/api/getAllMemos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (!response.ok) {
        throw new Error("저장된 장소 메모 데이터 로드 실패");
      }

      const data = await response.json();
      setUserMemoData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div onClick={handleLoadMyPlaces}>
      <li className="py-2 px-4 text-sm cursor-pointer hover:bg-gray-100">저장한 장소</li>
      {/* {isLoading && <p>로딩 중...</p>} */}
    </div>
  )
}

export default MyPlaces