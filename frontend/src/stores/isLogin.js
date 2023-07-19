import { defineStore } from 'pinia';

export const useLoginStore = defineStore('login', {
  state: () => {
    return {
      isLogin: false,
      userInfo: {},
    };
  },
  actions: {
    changeStatus() {
      this.isLogin = !this.isLogin;
    },
    initUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage }],
  },
});
