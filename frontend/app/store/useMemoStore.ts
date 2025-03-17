import { create } from "zustand";

interface MemoStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  toggle: () => void;
}

export const useMemoStore = create<MemoStore>((set, get) => ({
  isOpen: false,
  onOpen: () => {
    console.log("📢 onOpen() 호출됨!"); // 상태 업데이트 로그
    set({ isOpen: true });
  },
  onClose: () => {
    console.log("📢 onClose() 호출됨!"); // 상태 업데이트 로그
    set({ isOpen: false });
  },
  toggle: () => {
    const newState = !get().isOpen;
    console.log(`📢 toggle() 호출됨! 상태: ${newState}`); // 상태 업데이트 로그
    set({ isOpen: newState });
  },
}));
