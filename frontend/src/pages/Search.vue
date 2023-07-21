<template>
  <form @submit.prevent="handleSearch">
    <div>
      <label for="searchTerm">검색어:</label>
      <input type="text" id="searchTerm" v-model="searchTerm" required />
    </div>
    <div>
      <label for="category">카테고리:</label>
      <select id="category" v-model="selectedCategory">
        <option value="all">전체</option>
        <option value="머신러닝">머신러닝</option>
        <option value="데이터 분석">데이터 분석</option>
        <option value="인공지능">인공지능</option>
      </select>
    </div>
    <div>
      <label>검색 옵션:</label>
      <label>
        <input type="radio" value="all" v-model="searchOption" />
        전체
      </label>
      <label>
        <input type="radio" value="title" v-model="searchOption" />
        제목
      </label>
      <label>
        <input type="radio" value="content" v-model="searchOption" />
        내용
      </label>
      <label>
        <input type="radio" value="writer" v-model="searchOption" />
        작성자
      </label>
    </div>
    <b-button type="submit">검색</b-button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const searchTerm = ref('');
const selectedCategory = ref('all');
const searchOption = ref('all');

const handleSearch = () => {
  router.push({
    path: '/search/result',
    query: {
      keyword: searchTerm.value,
      category: selectedCategory.value,
      searchOption: searchOption.value,
    },
  });
};
</script>

<style scoped>
label {
  margin: 10px;
}

input {
  border: 1px gray solid;
  border-radius: 5px;
  padding: 5px;
}
</style>
