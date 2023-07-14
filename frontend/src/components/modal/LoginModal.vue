<template>
  <div class="member">
    <div class="field">
      <b>아이디</b>
      <input type="text" v-model="email" />
    </div>
    <div class="field">
      <b>비밀번호</b>
      <input type="password" v-model="password" />
    </div>
    <div class="button">
      <input type="submit" value="확인" @click="confirm" />
      <input type="submit" value="취소" @click="cancel" />
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from "@/stores/modal";
import { ref, defineEmits } from "vue";

const emit = defineEmits(["getUserInfo"]);
const modalStore = useModalStore();

const email = ref("");
const password = ref("");

const confirm = () => {
  emit("getUserInfo", email.value, password.value);
  modalStore.closeModal("modalLogin");
};
const cancel = () => {
  modalStore.closeModal("modalLogin");
};
</script>

<style>
.member {
  font-size: 14px;
  background-color: #f5f6f7;
  line-height: 1.5em;
  color: #222;
  width: 400px;
  margin: auto; /*중앙 정렬*/
  padding: 0 20px;
}

.member .field {
  margin: 5px 0;
}

.member b {
  display: block;
  margin-bottom: 5px;
}

.member input:not(input[type="radio"]),
.member select {
  border: 1px solid #dadada;
  padding: 15px;
  width: 90%;
  margin-bottom: 5px;
}

.member input[type="button"],
.member input[type="submit"] {
  background-color: #2db400;
  color: #fff;
}

.member .button {
  display: flex;
  margin: 30px;
}
</style>
