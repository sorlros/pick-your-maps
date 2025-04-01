import { create } from "zustand";

interface AllMemoStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAllMemo = create<AllMemoStore>((set) => ({
  isOpen: false,
  onOpen: () => {
    set({ isOpen: true });
  },
  onClose: () => {
    set({ isOpen: false });
  },
}))

export default useAllMemo;