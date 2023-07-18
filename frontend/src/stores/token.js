import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTokenStore = defineStore('token', () => {
  const list = ref({
    accessToken: '',
    refreshToken: '',
  });

  function reissue(token) {
    list.value.accessToken = token;
  }

  function initTokens(param) {
    list.value = param;
  }
  return { list, reissue, initTokens };
});
