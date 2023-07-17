<template>
  <h1 class="header">게시글 작성</h1>
  <form class="container" @submit.prevent="submitForm">
    <div class="form-item">
      <label for="title">제목 : </label>
      <input type="text" id="title" v-model="title" required />
    </div>

    <div class="form-item">
      <label for="category">카테고리 : </label>
      <select id="category" v-model="category" required>
        <option value="">카테고리 선택</option>
        <option value="머신러닝">머신러닝</option>
        <option value="데이터 분석">데이터 분석</option>
        <option value="인공지능">인공지능</option>
      </select>
    </div>

    <div class="form-item">
      <label for="content">내용</label>
      <quill-editor
        id="content"
        :options="toolbarOptions"
        @change="onEditorChange($event)"
      ></quill-editor>
    </div>

    <div class="form-item">
      <button type="submit">작성하기</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { quillEditor } from 'vue3-quill';

const title = ref('');
const category = ref('');
const content = ref('');

const onEditorChange = (e) => {
  content.value = e.html;
};

const toolbarOptions = {
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ align: [] }],
      ['image'],
    ],
  },
};

const submitForm = () => {
  // 게시글 작성 폼 제출 시 실행되는 로직
  console.log('제목:', title.value);
  console.log('카테고리:', category.value);
  // 여기서 게시글 작성 로직을 처리하면 됩니다.
  console.log('내용:', content.value);
};
</script>

<style>
.header {
  position: fixed;
  margin: 20px;
}

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
select {
  margin-left: 10px;
  border: 1px gray solid;
  border-radius: 5px;
  padding: 5px;
}
</style>
