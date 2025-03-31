import { create } from "zustand";

interface UserMemoStore {
  title: string;
  category: string;
  memo: string;
  rating: number;
  tags?: string[];
  userId: string;
  file?: string;
  setUserMemo: (memoData: UserMemoStore) => void;
  getUserMemo: () => UserMemoStore;
}

const useUserMemoStore = create<UserMemoStore>((set, get) => ({
  title: "",
  category: "",
  memo: "",
  rating: 0,
  tags: [""],
  userId: "",
  file: "",

  setUserMemo: (memoData: UserMemoStore) => set(() => ({
    title: memoData.title,
    category: memoData.category,
    memo: memoData.memo,
    rating: memoData.rating,
    tags: memoData.tags ?? [""],
    userId: memoData.userId,
    file: memoData.file ?? "",
  })),
  getUserMemo: () => get(),
}))

export default useUserMemoStore;