<template>
  <div class="container">
    <div class="form-item">
      <label for="name">이름 : </label>
      <input type="text" id="name" v-model="name" required />
    </div>

    <div class="form-item">
      <label for="number">전화번호 : </label>
      <input type="text" id="number" v-model="number" required />
    </div>

    <div class="form-item">
      <button class="submit" @click="findID">아이디 찾기</button>
      <p v-if="foundID">{{ foundID }}</p>
      <p v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { submitForm } from '@/api/userApi';
const name = ref('');
const number = ref('');
const foundID = ref('');
const error = ref('');
const findID = async () => {
  try {
    const response = await submitForm(name.value, number.value);
    const emails = response.data.email;
    if (Array.isArray(emails) && emails.length > 0) {
      foundID.value = `ID : ${emails[0].email}`;
      error.value = '';
    } else {
      foundID.value = '';
      error.value = '아이디를 찾을 수 없습니다. 입력 정보를 확인해주세요.';
    }
  } catch (err) {
    foundID.value = '';
    error.value = '아이디를 찾을 수 없습니다. 입력 정보를 확인해주세요.';
    alert(err);
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  padding: 100px;
  align-items: flex-start;
}
.form-item {
  width: 100%;
  margin-top: 30px;
}
input,
.submit {
  margin-left: 10px;
  border: 1px gray solid;
  border-radius: 5px;
  padding: 5px;
}
</style>
