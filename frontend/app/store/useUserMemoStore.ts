import { create } from "zustand";

interface MapState {
  lat: number,
  lng: number
}

interface MemoData {
  id: string;
  title: string;
  category: string;
  memo: string;
  rating: number;
  tags?: string[];
  userId: string;
  image?: string;
  coordinate: MapState;
}

interface UserMemoStore {
  memos: MemoData[];
  addAllMemos: (allMemoData: MemoData[]) => void;
  updateUserMemo: (id: string, updatedData: Partial<MemoData>) => void;
  deleteUserMemo: (id: string) => void;
  getUserMemos: () => MemoData[];
}

const useUserMemoStore = create<UserMemoStore>((set, get) => ({
  memos: [],

  // 특정 메모 수정
  updateUserMemo: (id, updatedData) =>
    set((state) => ({
      memos: state.memos.map((memo) =>
        memo.id === id ? { ...memo, ...updatedData } : memo
      ),
    })),

  // 특정 메모 삭제
  deleteUserMemo: (id) =>
    set((state) => ({
      memos: state.memos.filter((memo) => memo.id !== id),
    })),

  // 모든 메모 가져오기
  getUserMemos: () => get().memos,
  addAllMemos: (allMemoData) =>
    set(() => ({
      memos: allMemoData,
    })),
}))

export default useUserMemoStore;