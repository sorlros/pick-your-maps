import useUserMemoStore from '@/store/useUserMemoStore'
import React from 'react'

const AllMemo = () => {
  const allMemo = useUserMemoStore((state) => state.memos);
  const dummyMemos = [
    {
      id: "1",
      title: "맛집 기록",
      memo: "강남역 근처 이자카야 정말 맛있었음!",
      tags: ["음식", "강남"],
    },
    {
      id: "2",
      title: "여행 메모",
      memo: "부산 해운대 도착, 바닷바람 최고.",
      tags: ["여행", "부산"],
    },
  ]

  return (
    <div className="flex justify-center w-full h-full bg-neutral-800 rounded-xl p-4 overflow-y-auto">
      <div className="w-full space-y-4">
        {dummyMemos.map((memo) => (
          <div 
            key={memo.id}
            className="bg-neutral-700 p-4 rounded-lg shadow hover:bg-neutral-600 transition cursor-pointer"
          >
            <h3 className="text-lg font-semibold text-white">{memo.title}</h3>
            <p className="text-sm text-neutral-300 mt-1">{memo.memo}</p>
            <div className="flex flex-wrap gap-2 mt-2">
            {memo.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-neutral-600 text-white px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllMemo;