<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="info"
      fixed="top"
      sticky="true"
    >
      <b-navbar-brand @click="moveToHome"
        >DEVER's Developer Blog</b-navbar-brand
      >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item @click="moveToMachineBoard">머신러닝</b-nav-item>
          <b-nav-item @click="moveToDataBoard">데이터분석</b-nav-item>
          <b-nav-item @click="moveToAIBoard">인공지능</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-button type="submit" @click="moveToSearch">검색</b-button>

          <b-nav-item @click="moveToFindId" v-if="!loginStore.isLogin"
            >아이디 찾기</b-nav-item
          >

          <b-nav-item @click="handleLogin" v-if="!loginStore.isLogin"
            >로그인</b-nav-item
          >
          <b-nav-item @click="handleLogin" v-if="loginStore.isLogin"
            >로그아웃</b-nav-item
          >
          <b-nav-item @click="boardWrite" v-if="loginStore.isLogin"
            >게시글 작성</b-nav-item
          >
          <b-nav-item @click="signIn" v-if="!loginStore.isLogin"
            >회원가입</b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
  <TeleportModal v-if="modalStore.modal.modalLogin">
    <LoginModal @getUserInfo="getUserInfo" />
  </TeleportModal>
  <TeleportModal v-if="modalStore.modal.modalSignIn">
    <SignInModal @postUserInfo="postUserInfo" />
  </TeleportModal>
  <router-view :key="route.fullPath"></router-view>
</template>

<script setup>
import TeleportModal from './modal/TeleportModal.vue';
import LoginModal from './modal/LoginModal.vue';
import SignInModal from './modal/SignInModal.vue';

import { useRoute, useRouter } from 'vue-router';
import { useModalStore } from '@/stores/modal';
import { useTokenStore } from '@/stores/token';
import { useLoginStore } from '@/stores/isLogin';

import { postLogin, postSignIn } from '@/api/userApi.js';

const router = useRouter();
const route = useRoute();
const modalStore = useModalStore();
const tokenStore = useTokenStore();
const loginStore = useLoginStore();

function moveToFindId() {
  router.push('/find/id');
}
function moveToHome() {
  router.push('/');
}
function moveToMachineBoard() {
  router.push({
    path: '/board/machine',
    query: {
      page: 1,
    },
  });
}
function moveToDataBoard() {
  router.push({
    path: '/board/data',
    query: {
      page: 1,
    },
  });
}
function moveToAIBoard() {
  router.push({
    path: '/board/AI',
    query: {
      page: 1,
    },
  });
}
function moveToBoardWrite() {
  router.push({
    path: '/board/Write',
  });
}
function moveToSearch() {
  router.push('/search');
}

function getUserInfo(email, password) {
  postLogin(email, password).then((res) => {
    tokenStore.initTokens({
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
    });
    loginStore.initUserInfo(res.data.userInfo);
  });

  loginStore.changeStatus();
}

function postUserInfo(email, password, name, phoneNumber) {
  const data = postSignIn(email, password, name, phoneNumber);

  if (data.status == 400) {
    alert('이메일 중복');
  } else {
    alert('회원가입 성공');
  }
}

function handleLogin() {
  if (!loginStore.isLogin) {
    modalStore.openModal('modalLogin');
  } else {
    loginStore.changeStatus();
  }
}

function boardWrite() {
  moveToBoardWrite();
}

function signIn() {
  modalStore.openModal('modalSignIn');
}
</script>

<style>
.ml-auto {
  margin-left: auto !important;
}
</style>
