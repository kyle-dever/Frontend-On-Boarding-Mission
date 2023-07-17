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
        <option value="카테고리1">머신러닝</option>
        <option value="카테고리2">데이터 분석</option>
        <option value="카테고리3">인공지능</option>
      </select>
    </div>

    <div class="form-item">
      <label for="content">내용</label>
      <editor-content id="content" :editor="editor" />
    </div>

    <div class="form-item">
      <button type="submit">작성하기</button>
    </div>
  </form>
</template>

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
select,
#content {
  margin-left: 10px;
  border: 1px gray solid;
  border-radius: 5px;
  padding: 5px;
}
</style>

<script setup>
import { ref } from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';

const editor = useEditor({
  content: '<p></p>',
  extensions: [StarterKit],
  onUpdate: ({ editor }) => {
    content.value = editor.getHTML();
  },
});

const title = ref('');
const category = ref('');
const content = ref('');

const submitForm = () => {
  // 게시글 작성 폼 제출 시 실행되는 로직
  console.log('제목:', title.value);
  console.log('카테고리:', category.value);
  console.log('내용:', content.value);
  // 여기서 게시글 작성 로직을 처리하면 됩니다.
};
</script>
