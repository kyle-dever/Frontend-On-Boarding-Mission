<template>
  <h1 class="text-left">머신러닝</h1>
  <BoardList v-model:items="list" />
</template>

<script setup>
import BoardList from "@/components/BoardList.vue";

const list = [
  { id: 1, title: "첫 번째 게시글", writer: "artistjay" },
  { id: 2, title: "두 번째 게시글", writer: "artistjay" },
  { id: 3, title: "세 번째 게시글", writer: "artistjay" },
  { id: 4, title: "네 번째 게시글", writer: "artistjay" },
  { id: 5, title: "다섯 번째 게시글", writer: "artistjay" },
  { id: 6, title: "여섯 번째 게시글", writer: "artistjay" },
  { id: 6, title: "여섯 번째 게시글", writer: "artistjay" },
  { id: 6, title: "여섯 번째 게시글", writer: "artistjay" },
  { id: 6, title: "여섯 번째 게시글", writer: "artistjay" },
  { id: 6, title: "여섯 번째 게시글", writer: "artistjay" },
  { id: 6, title: "여섯 번째 게시글", writer: "artistjay" },
  { id: 6, title: "여섯 번째 게시글", writer: "artistjay" },
  { id: 6, title: "여섯 번째 게시글", writer: "artistjay" },
  { id: 6, title: "여섯 번째 게시글", writer: "artistjay" },
  { id: 6, title: "여섯 번째 게시글", writer: "artistjay" },
  { id: 6, title: "여섯 번째 게시글", writer: "artistjay" },
  { id: 6, title: "여섯 번째 게시글", writer: "artistjay" },
  { id: 6, title: "여섯 번째 게시글", writer: "artistjay" },
  { id: 6, title: "여섯 번째 게시글", writer: "artistjay" },
];
</script>

<style scoped>
.text-left {
  margin-top: 100px;
  margin-left: 50px;
  margin-bottom: 20px;
}
</style>
