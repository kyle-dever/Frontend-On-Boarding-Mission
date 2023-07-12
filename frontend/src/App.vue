<template>
  <div id="app">
    <div>
      <button @click="handleLogin">{{ loginText }}</button>
      <button @click="signIn">회원가입</button>
      <TeleportModal v-if="modalStore.modal.modalLogin">
        <LoginModal @getUserInfo="getUserInfo" />
      </TeleportModal>
      <TeleportModal v-if="modalStore.modal.modalSignIn">
        <SignInModal @postUserInfo="postUserInfo" />
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
import SignInModal from '@/components/modal/SignInModal';
import { useModalStore } from './stores/modal';
import { useListStore } from './stores/token';
import { useLoginStore } from './stores/isLogin';
import { postLogin, postSignIn } from '@/api/userApi.js';

const router = useRouter();
const modalStore = useModalStore();
const listStore = useListStore();
const loginStore = useLoginStore();

const moveToHome = () => {
  router.push({ path: '/' })
}
const moveToMyPage = () => {
  router.push({ path: '/mypage' })
}

function getUserInfo(email, password) {
  const accessToken = postLogin(email, password)

  listStore.addList({
    accessToken: accessToken,
  })

  loginText.value = "로그아웃"
  loginStore.changeStatus();
}

function postUserInfo(email, password, name, phoneNumber) {
  const data = postSignIn(email, password, name, phoneNumber)

  if (data.status == 400) {
    alert("이메일 중복")
  }
  else {
    alert("회원가입 성공")
  }
}

function handleLogin() {
  if (loginText.value == "로그인") {
    modalStore.openModal('modalLogin');
  }
  else {
    loginText.value = "로그인";
    loginStore.changeStatus();
  }
}

function signIn() {
  modalStore.openModal('modalSignIn');
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
