import { create } from "zustand";

interface IuseSearchModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSearchModal = create<IuseSearchModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
