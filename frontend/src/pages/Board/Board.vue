<template>
  <div class="container">
    <h1 id="title">게시글 조회</h1>

    <div class="btn-wrapper">
      <div class="btn" v-if="post.writer == loginStore.userInfo.userName">
        <input type="submit" value="수정" @click="modifyBoard" />
        <input type="submit" value="삭제" @click="deleteBoard" />
      </div>
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
import { onBeforeMount, ref } from 'vue';
import { getBoardFromId, deleteBoardFromId } from '@/api/boardApi';
import router from '@/router/router';
import { useModalStore } from '@/stores/modal';
import { useLoginStore } from '@/stores/isLogin';
import TeleportModal from '@/components/modal/TeleportModal.vue';
import DeleteModal from '@/components/modal/DeleteModal.vue';

const route = useRoute();
const boardId = route.query.id;

const post = ref({});
const loading = ref(true);

const modalStore = useModalStore();
const loginStore = useLoginStore();

const modifyBoard = () => {
  const isModify = true;
  const boardInfo = {
    boardId: boardId,
    title: post.value.title,
    category: post.value.category,
    content: post.value.content,
  };
  router.push({
    name: 'Write',
    params: {
      isModify: isModify,
      boardInfo: JSON.stringify(boardInfo),
    },
  });
};

const deleteBoard = () => {
  modalStore.openModal('modalDelete');
};

const handleDelete = () => {
  deleteBoardFromId(boardId).then(() => {
    alert('삭제가 완료 되었습니다.');
  });
  router.go(-1);
  // id로 Delete후 이전 페이지로 이동
};

onBeforeMount(() => {
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

.btn-wrapper {
  display: flex;
  justify-content: flex-end;
}

.btn {
  margin-left: 10px; /* 간격을 조정할 수 있습니다. */
}

.btn input {
  border: 1px solid #000;
  border-radius: 5px;
  margin: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
}

.content-wrapper {
  margin-top: 50px;
}
</style>
