<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div>
      <button @click="handleClick">{{ loginText }}</button>
      <p>Email : {{ email }}</p>
      <p>Password : {{ password }}</p>
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

const router = useRouter();
const modalStore = useModalStore();

const email = ref('');
const password = ref('');

const moveToHome = () => {
  router.push({ path: '/' })
}
const moveToMyPage = () => {
  router.push({ path: '/mypage' })
}

function getUserInfo(email, password) {
    this.email.value = email;
    this.password.value = password;
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
