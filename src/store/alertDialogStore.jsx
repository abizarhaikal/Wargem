// src/store/alertDialogStore.js
import { create } from "zustand";

const useAlertDialogStore = create((set) => ({
  isOpen: false,
  title: "",
  description: "",
  onConfirm: () => {},
  showDialog: (title, description, onConfirm = () => {}) =>
    set({ isOpen: true, title, description, onConfirm }),
  hideDialog: () =>
    set({ isOpen: false, title: "", description: "", onConfirm: () => {} }),
}));

export default useAlertDialogStore;
