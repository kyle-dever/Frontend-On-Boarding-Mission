import { defineStore } from 'pinia';

export const useTokenStore = defineStore('token', {
  state: () => {
    return {
      accessToken: '',
      refreshToken: '',
    };
  },
  actions: {
    reissue(token) {
      this.accessToken = token;
    },
    initTokens(param) {
      this.accessToken = param.accessToken;
      this.refreshToken = param.refreshToken;
    },
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage }],
  },
});
