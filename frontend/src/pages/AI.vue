<template>
  <h1 class="text-left">인공지능</h1>
  <BoardList
    :list="list"
    :rows="boardStore.getRows()"
    @clickedBoard="clickedBoard"
    @clickedPage="clickedPage"
  />
</template>

<script setup>
import BoardList from '@/components/BoardList.vue';

import { ref } from 'vue';
import { useBoardStore } from '@/stores/board';

const boardStore = useBoardStore();
const datas = ref([]);

const clickedBoard = (id) => {
  console.log('clicked: ' + id);
};

const clickedPage = (page) => {
  datas.value = boardStore.getList('AI', page);
};
</script>

<style scoped>
.text-left {
  margin-top: 100px;
  margin-left: 50px;
  margin-bottom: 20px;
}
</style>
