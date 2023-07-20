<template>
  <div class="container">
    <h1 id="title">게시글 조회</h1>

    <div class="btn" v-if="post.writer == loginStore.userInfo.userName">
      <input type="submit" value="수정" @click="modifyBoard" />
      <input type="submit" value="삭제" @click="deleteBoard" />
    </div>

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
  <TeleportModal v-if="modalStore.modal.modalDelete">
    <DeleteModal @handleDelete="handleDelete" />
  </TeleportModal>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { getBoardFromId } from '@/api/boardApi';
import router from '@/router/router';
import { useModalStore } from '@/stores/modal';
import { useLoginStore } from '@/stores/isLogin';
import TeleportModal from '@/components/modal/TeleportModal.vue';
import DeleteModal from '@/components/modal/DeleteModal.vue';

const route = useRoute();
const boardId = route.query.id;

const post = ref({
  title: '',
  writer: '',
  content: '',
});
const loading = ref(true);

const modalStore = useModalStore();
const loginStore = useLoginStore();

const modifyBoard = () => {
  router.push({
    path: '/board/write',
    params: {},
  });
};

const deleteBoard = () => {
  modalStore.openModal('modalDelete');
};

const handleDelete = () => {
  boardId;
  // id로 Delete후 이전 페이지로 이동
};

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
