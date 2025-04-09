import useUserMemoStore from '@/store/useUserMemoStore'
import Image from 'next/image';
import React from 'react'
import { ReadOnlyRating } from './rating';
import { X } from 'lucide-react';
import { useAllMemoStore } from "@/store/allMemoStore";
import { useMapStore } from '@/store/useMapStore';

const AllMemo = () => {
  const allMemo = useUserMemoStore((state) => state.memos);
  const closeModal = useAllMemoStore((state) => state.onClose)
  const setCoordinate = useMapStore((state) => state.setCoordinate);

  const handleClose = () => {
    closeModal();
  }

  return (
    <div className="relative w-full h-full bg-neutral-800 rounded-xl p-4">
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-white hover:text-red-400 transition z-50"
      >
        <X size={24} />
      </button>

      {/* 메모 카드 리스트 - 스크롤 영역 */}
      <div className="mt-12 h-[calc(100%-3rem)] overflow-y-auto pr-2 space-y-4">
        {allMemo.map((memo) => (
          <div 
            key={memo.id}
            className="flex flex-col sm:flex-row bg-neutral-700 p-4 rounded-lg shadow hover:bg-neutral-600 transition cursor-pointer gap-4"
            onClick={() => setCoordinate(memo.coordinate)}
          >
            <Image
              width={100}
              height={100}
              src={`${process.env.NEXT_PUBLIC_TO_BACKEND}/${memo.image}`}
              alt={`${memo.title} 이미지`}
              className="w-full sm:w-40 h-32 object-cover rounded-md"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">{memo.title}</h3>
              <p className="text-sm text-neutral-300 mt-1">{memo.memo}</p>
              {memo.rating && (
                <div className="mt-2">
                  <ReadOnlyRating value={memo.rating} />
                </div>
              )}
              <div className="flex flex-wrap gap-2 mt-2">
                {memo.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-neutral-600 text-white px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllMemo;