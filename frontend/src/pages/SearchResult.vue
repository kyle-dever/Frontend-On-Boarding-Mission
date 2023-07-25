<template>
  <h1>"{{ keyword }}" 검색 결과</h1>
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
import { ref, onBeforeMount } from 'vue';
import { getSearchBoardFromKeyword } from '@/api/boardApi';

const datas = ref([]);
const totalCount = ref(0);
const hasNext = ref(false);
const router = useRouter();
const route = useRoute();

const keyword = ref('');
const category = ref('');
const searchOption = ref('');

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
      keyword: keyword.value,
      category: category.value,
      searchOption: searchOption.value,
      page: `${page}`,
    },
  });

  const params = {
    keyword: keyword.value,
    category: category.value,
    option: searchOption.value,
  };

  getBoardList(params, page);
};

const getBoardList = (params, page) => {
  getSearchBoardFromKeyword(params, page).then((result) => {
    datas.value = result.data.boards;
    totalCount.value = result.data.totalCount;
    hasNext.value = result.data.hasNext;
  });
};

onBeforeMount(() => {
  keyword.value = route.query.keyword;
  category.value = route.query.category;
  searchOption.value = route.query.searchOption;

  const params = {
    keyword: keyword.value,
    category: category.value,
    option: searchOption.value,
  };

  getBoardList(params, route.query.page);
});
</script>
