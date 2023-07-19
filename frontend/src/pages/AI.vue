<template>
  <h1 class="text-left">인공지능</h1>
  <BoardList
    :list="datas.value"
    :rows="totalCount.value"
    @clickedBoard="clickedBoard"
    @clickedPage="clickedPage"
  />
</template>

<script setup>
import BoardList from '@/components/BoardList.vue';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { getBoardListFromCategory } from '@/api/boardApi';

const datas = ref([]);
const hasNext = ref(true);
const totalCount = ref(0);
const router = useRouter();

const clickedBoard = (id) => {
  router.push({
    path: '/board/board',
    query: {
      id: id,
    },
  });
};

const clickedPage = (page) => {
  getBoardList('인공지능', page);
};

const getBoardList = (category, page) => {
  getBoardListFromCategory(category, page).then((result) => {
    datas.value = result.boards;
    totalCount.value = result.totalCount;
    hasNext.value = result.hasNext;
  });
};

onMounted(() => {
  getBoardList('인공지능', 1);
});
</script>

<style scoped>
.text-left {
  margin-top: 100px;
  margin-left: 50px;
  margin-bottom: 20px;
}
</style>
