import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  userId: string;
  setUserId: (value: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
  isOpen: false,
  onOpen: () => {
    set({ isOpen: true });
  },
  onClose: () => {
    set({ isOpen: false });
  },
  userId: "",
  setUserId: (value: string) => set({
    userId: value,
  })
}));