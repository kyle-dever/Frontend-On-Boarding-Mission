<template>
  <div>Home</div>
</template>

<script setup>
import { ref } from 'vue';
import { getBoardListAll } from '@/api/boardApi';

const datas = ref(null);

function getBoardListForHome() {
  getBoardListAll().then((res) => (datas.value = res.data.boards));
}

getBoardListForHome();
</script>
