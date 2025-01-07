// src/store/alertDialogStore.js
import { create } from 'zustand';

const useAlertDialogStore = create((set) => ({
  isOpen: false,
  title: 'Pemberitahuan',
  description: '',
  onConfirm: () => {}, // Default empty function
  shownInDashboard: false,
  
  showDialog: (title = 'Pemberitahuan', description = '', onConfirm = () => {}) => 
    set({ isOpen: true, title, description, onConfirm }),
  
  hideDialog: () => 
    set({ 
      isOpen: false,
      // Reset ke default values saat dialog ditutup
      title: 'Pemberitahuan',
      description: '',
      onConfirm: () => {}
    }),
  
  setShownInDashboard: (value) => 
    set({ shownInDashboard: value }),
}));

export default useAlertDialogStore;