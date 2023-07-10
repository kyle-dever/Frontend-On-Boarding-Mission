<template>
    <Modal class="background" ref="baseModal">
        <div class="content-container">
            <input type="text" v-model="email">
            <input type="password" v-model="password">
        </div>
        <div class="buttons-container">
            <button class="btn confirm" @click="confirm">확인</button>
            <button class="btn cancel" @click="cancel">취소</button>
        </div>
    </Modal>
</template>

<script setup>
import { useModalStore } from "@/stores/modal";
import Modal from "./TeleportModal.vue";
import { ref, defineEmits } from "vue";

const emit = defineEmits(['getUserInfo'])
const modalStore = useModalStore();

const email = ref('');
const password = ref('');

const confirm = () => {
    emit('getUserInfo', email.value, password.value)
    modalStore.closeModal('modalLogin');
}
const cancel = () => {
    modalStore.closeModal('modalLogin');
}
</script>

<style>
.background {
    margin: 0 auto;
    width: 50%;
    height: 50%;
    background: #FFFFFFFF;
}

.content-container {
    margin: 0 auto;
    display: block;
}
</style>