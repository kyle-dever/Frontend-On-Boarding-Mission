<template>
  <div class="member">
    <div class="field">
      <b>아이디</b>
      <span class="placehold-text"
        ><input type="text" v-model="email" required
      /></span>
    </div>
    <div class="field">
      <b>비밀번호</b>
      <input class="userpw" type="password" v-model="password" required />
    </div>
    <div class="field">
      <b>이름</b>
      <input class="name" type="text" v-model="name" required />
    </div>
    <div class="field">
      <b>전화번호</b>
      <input class="number" type="text" v-model="phoneNumber" required />
    </div>
    <div class="button">
      <input type="submit" @click="confirm" value="가입하기" />
      <input type="submit" @click="cancel" value="취소" />
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/modal';
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['postUserInfo']);
const modalStore = useModalStore();

const email = ref('');
const password = ref('');
const name = ref('');
const phoneNumber = ref('');

const confirm = () => {
  emit(
    'postUserInfo',
    email.value,
    password.value,
    name.value,
    phoneNumber.value
  );
  modalStore.closeModal('modalSignIn');
};
const cancel = () => {
  modalStore.closeModal('modalSignIn');
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
  margin-bottom: 20px;
  margin-top: 20px;
}

.member .field {
  margin: 5px 0;
}

.member b {
  display: block;
  margin-bottom: 5px;
}

.member input:not(input[type='radio']),
.member select {
  border: 1px solid #dadada;
  padding: 15px;
  width: 90%;
  margin-bottom: 5px;
}

.member input[type='button'],
.member input[type='submit'] {
  background-color: #2db400;
  color: #fff;
}

.member .button {
  display: flex;
  margin: 30px;
}

.member input:focus,
.member select:focus {
  border: 1px solid #2db400;
}

.placehold-text,
.name,
.number {
  display: block; /*span 으로 감싸서 크기영역을 블록요소로 만들어ㅜ저야한다*/
  position: relative;
  /* border: 1px solid #000; */
}

.userpw {
  background-size: 20px;
  background-color: #fff;
}

.userpw-confirm {
  background-size: 20px;
  background-color: #fff;
}

@media (max-width: 768px) {
  .member {
    width: 100%;
  }
}
</style>
