<template>
  <p>정말로 삭제하시겠습니까?</p>
  <div class="btn">
    <button @click="emits('handleDelete')">삭제</button>
    <button @click="cancel">취소</button>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/modal';
import { defineEmits } from 'vue';

const emits = defineEmits(['handleDelete']);
const modalStore = useModalStore();

const cancel = () => {
  modalStore.closeModal('modalDelete');
};
</script>
