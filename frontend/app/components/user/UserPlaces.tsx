import useUserMemoStore from '@/store/useUserMemoStore';
import React, { useState } from 'react'
import Loading from '../ui/spinner';
// import { useAuthStore } from '@/store/useAuthStore';

const UserPlaces = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const setUserMemoData = useUserMemoStore((state) => state.setUserMemo);
  const userMemoData = useUserMemoStore((state) => state.getUserMemos);
  // const userId = useAuthStore((state) => state.userId);
  const addAllMemo = useUserMemoStore((state) => state.addAllMemos);

  const handleLoadUserPlaces = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_TO_BACKEND}/api/memo/getAllMemos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        // body: JSON.stringify({ userId }),
      })

      if (!response.ok) {
        throw new Error("저장된 장소 메모 데이터 로드 실패");
      }
      const data = await response.json();
      addAllMemo(data);
      console.log("모든 메모: ", userMemoData());
      // setUserMemoData(data);
      // console.log("Data", data)
      // console.log("userMemoData", userMemoData)
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading ? (
        <li className="py-2 px-4 text-sm hover:bg-gray-100">
          <Loading />
        </li> ) : (
        <li 
          className="py-2 px-4 text-sm cursor-pointer hover:bg-gray-100"
          onClick={handleLoadUserPlaces}
        >
          저장한 장소
        </li>
      )}
    </>
  )
}

export default UserPlaces;