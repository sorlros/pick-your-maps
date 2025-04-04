import { create } from "zustand";

interface AllMemoStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  toggle: () => void;
}

export const useAllMemoStore = create<AllMemoStore>((set, get) => ({
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
