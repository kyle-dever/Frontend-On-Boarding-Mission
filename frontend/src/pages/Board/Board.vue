<template>
  <div class="container">
    <h1 class="title">게시글 조회</h1>
    <div v-if="loading">로딩 중...</div>
    <div v-else>
      <div>
        <h2>제목 : {{ post.title }}</h2>
        <h5>작성자: {{ post.writer }}</h5>
      </div>
      <div class="content-wrapper">
        <div v-html="post.content"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { getBoardFromId } from '@/api/boardApi';

const route = useRoute();
const boardId = route.query.id;

const post = ref(null);
const loading = ref(true);

onMounted(() => {
  getBoardFromId(boardId).then((result) => {
    post.value = result.data.board;
    loading.value = false;
  });
});
</script>

<style>
.container {
  display: block;
  text-align: left;
}

h1 {
  margin-left: 0;
  margin-bottom: 50px;
}

div[v-else] {
  margin-left: 30px;
}

h2 {
  margin-bottom: 10px;
}

p {
  margin-top: 0;
  margin-left: 30px;
}

.content-wrapper {
  margin-top: 50px;
}
</style>
