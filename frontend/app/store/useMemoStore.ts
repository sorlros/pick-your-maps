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
    set({ isOpen: true });
  },
  onClose: () => {
    set({ isOpen: false });
  },
  toggle: () => {
    const newState = !get().isOpen;
    set({ isOpen: newState });
  },
}));
