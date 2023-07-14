import { defineStore } from "pinia";

export const useLoginStore = defineStore("login", {
  state: () => {
    return {
      isLogin: false,
    };
  },
  actions: {
    changeStatus() {
      this.isLogin = !this.isLogin;
    },
  },
});
