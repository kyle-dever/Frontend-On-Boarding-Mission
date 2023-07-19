<template>
  <h1 class="text-left">데이터 분석</h1>
  <BoardList
    :list="datas"
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
      id: `${id}`,
    },
  });
};

const clickedPage = (page) => {
  getBoardList('데이터 분석', page);
};

const getBoardList = (category, page) => {
  getBoardListFromCategory(category, page).then((result) => {
    datas.value = result.data.boards;
    totalCount.value = result.data.totalCount;
    hasNext.value = result.data.hasNext;
  });
};

onMounted(() => {
  getBoardList('데이터 분석', 1);
});
</script>

<style scoped>
.text-left {
  margin-top: 100px;
  margin-left: 50px;
  margin-bottom: 20px;
}
</style>
