<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <button @click="moveToHome">Home</button>
    <button @click="moveToMyPage">Mypage</button>
    <router-view></router-view>
  </div>
  <div id="teleport-area">

  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const moveToHome = () => {
  router.push({ path: '/' })
}
const moveToMyPage = () => {
  router.push({ path: '/mypage' })
}

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
</style>
