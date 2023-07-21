<template>
  <h1 class="text-left">인공지능</h1>
  <BoardList
    :list="datas"
    :rows="totalCount"
    @clickedBoard="clickedBoard"
    @clickedPage="clickedPage"
    :currentPage="route.query.page"
  />
</template>

<script setup>
import BoardList from '@/components/BoardList.vue';
import { useRouter, useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { getBoardListFromCategory } from '@/api/boardApi';

const datas = ref([]);
const hasNext = ref(true);
const totalCount = ref(0);
const router = useRouter();
const route = useRoute();

const clickedBoard = (id) => {
  router.push({
    path: '/board/board',
    query: {
      id: `${id}`,
    },
  });
};

const clickedPage = (page) => {
  router.push({
    query: {
      page: `${page}`,
    },
  });
  getBoardList('인공지능', page);
};

const getBoardList = (category, page) => {
  getBoardListFromCategory(category, page).then((result) => {
    datas.value = result.data.boards;
    totalCount.value = result.data.totalCount;
    hasNext.value = result.data.hasNext;
  });
};

onMounted(() => {
  getBoardList('인공지능', route.query.page);
});
</script>

<style scoped>
.text-left {
  margin-top: 100px;
  margin-left: 50px;
  margin-bottom: 20px;
}
</style>
