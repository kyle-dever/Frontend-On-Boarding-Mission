<template>
  <div class="container">
    <h1 class="title">게시글 조회</h1>
    <div v-if="loading">로딩 중...</div>
    <div v-else>
      <div>
        <h2>제목 :{{ post.title }}</h2>
        <h5>작성자: {{ post.author }}</h5>
      </div>
      <div class="content-wrapper">
        <div v-html="post.content"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const post = ref({
  title: 'HIHI',
  author: 'Kyle',
  content:
    '<p>안녕하세욥</p><p><br></p><p><img src="http://localhost:3000/uploads/스크린샷 2023-07-17 오전 9.25.522023-07-17T08-56-36.582Z.png"></p><p><br></p><p>하이루~~</p>',
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
