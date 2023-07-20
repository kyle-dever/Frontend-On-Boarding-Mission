<template>
  <div class="container">
    <p>정말로 삭제하시겠습니까?</p>
    <div class="btn">
      <input type="submit" value="삭제" @click="submit" />
      <input type="submit" value="취소" @click="cancel" />
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/modal';
import { defineEmits } from 'vue';

const emits = defineEmits(['handleDelete']);
const modalStore = useModalStore();

const submit = () => {
  modalStore.closeModal('modalDelete');
  emits('handleDelete');
};
const cancel = () => {
  modalStore.closeModal('modalDelete');
};
</script>

<style scoped>
.container {
  font-size: 14px;
  background-color: #f5f6f7;
  line-height: 1.5em;
  color: #222;
  width: 400px;
  margin: auto; /*중앙 정렬*/
  padding: 0 20px;
}
</style>
