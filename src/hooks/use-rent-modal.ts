import { create } from "zustand";

interface IuseRentModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useRentModal = create<IuseRentModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
