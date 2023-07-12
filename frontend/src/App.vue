<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div>
      <button @click="handleClick">{{ loginText }}</button>
      <TeleportModal v-if="modalStore.modal.modalLogin">
        <LoginModal @getUserInfo="getUserInfo"/>
      </TeleportModal>
    </div>
    <button @click="moveToHome">Home</button>
    <button @click="moveToMyPage">Mypage</button>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import TeleportModal from '@/components/modal/TeleportModal.vue';
import LoginModal from '@/components/modal/LoginModal'
import { useModalStore } from './stores/modal';
import { useListStore } from './stores/token';
import { postSignIn } from '@/api/userApi.js';


const router = useRouter();
const modalStore = useModalStore();
const listStore = useListStore();

const moveToHome = () => {
  router.push({ path: '/' })
}
const moveToMyPage = () => {
  router.push({ path: '/mypage' })
}

function getUserInfo(email, password) {
  const accessToken = postSignIn(email, password)
  console.log(accessToken)

  listStore.addList({
    accessToken: accessToken,
  })

  console.log(listStore.getDataAll)
}

function handleClick() {
  modalStore.openModal('modalLogin');
}

const loginText = ref("로그인");

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

teleport-area {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
