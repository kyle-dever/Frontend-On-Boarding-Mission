<template>
    <Modal class="background" ref="baseModal">
        <div class="content-container">
            <b>아이디</b>
            <input type="text" v-model="email">
            <b>비밀번호</b>
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

const email = ref('email');
const password = ref('password');

const confirm = () => {
    emit('getUserInfo', email.value, password.value)
    modalStore.closeModal('modalLogin');
}
const cancel = () => {
    modalStore.closeModal('modalLogin');
}
</script>

<style>
.content-container {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-items: center;
}

.buttons-container {
    margin: 0 auto;
    display: flex;
}
</style>