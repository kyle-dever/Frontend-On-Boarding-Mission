import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
  state: () => {
    return {
      isOpen: false,
      modal: {
        modalLogin: false,
        modalSignIn: false,
      },
    };
  },
  actions: {
    openModal(modalName) {
      if (this.modal[modalName] !== undefined) {
        this.modal[modalName] = true;
        this.isOpen = true;
      } else {
        console.error('no modal', modalName);
      }
    },
    closeModal(modalName) {
      if (this.modal[modalName] !== undefined) {
        this.modal[modalName] = false;
        this.isOpen = false;
      } else {
        console.error(this.modal[modalName], modalName);
      }
    },
  },
});
