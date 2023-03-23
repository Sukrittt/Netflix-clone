import { create } from "zustand";

//defines the structure of an object to be stored in the store.
export interface ModalStoreInterface {
  movieId?: string;
  isOpen: boolean;
  openModal: (movieId: string) => void;
  closeModal: () => void;
}

//to create a zustand store and define it's structure.
const useInfoModel = create<ModalStoreInterface>((set) => ({
  movieId: undefined,
  isOpen: false,
  openModal: (movieId: string) => set({ isOpen: true, movieId }),
  closeModal: () => set({ isOpen: false, movieId: undefined }),
}));

export default useInfoModel;
