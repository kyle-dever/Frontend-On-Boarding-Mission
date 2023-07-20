<template>
  <div><Card :datas="datas" @get-board="clickedBoard" /></div>
</template>

<script setup>
import { ref } from 'vue';
import { getBoardListAll } from '@/api/boardApi';
import Card from '@/components/Card.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const datas = ref(null);

function getBoardListForHome() {
  getBoardListAll().then((res) => {
    datas.value = res.data.boards;
  });
}

const clickedBoard = (id) => {
  router.push({
    path: '/board/board',
    query: {
      id: `${id}`,
    },
  });
};

getBoardListForHome();
</script>
