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
        :content="content"
        :options="toolbarOptions"
        @change="onEditorChange($event)"
        @ready="onEditorReady($event)"
      >
      </quill-editor>
    </div>

    <div class="form-item">
      <button class="submit" type="submit">작성하기</button>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { quillEditor } from 'vue3-quill';
import { useRouter, useRoute } from 'vue-router';
import { postImage } from '@/api/boardApi';
import { useLoginStore } from '@/stores/isLogin';
import { postBoard, updateBoardFromId } from '@/api/boardApi';

const title = ref('');
const category = ref('');
const content = ref('');

const loginStore = useLoginStore();
const router = useRouter();
const route = useRoute();

const isModify = route.params.isModify;
let boardInfo;
if (isModify) {
  boardInfo = JSON.parse(route.params.boardInfo);
}

const onEditorChange = (event) => {
  content.value = event.html;
};

const toolbars = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ size: ['small', false, 'large', 'huge'] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ align: [] }],
  ['image'],
];

const toolbarOptions = {
  modules: {
    toolbar: {
      container: toolbars,
    },
  },
};

const submitForm = () => {
  const thumbnail = getFirstImage();
  const params = {
    userId: loginStore.userInfo.userId,
    userName: loginStore.userInfo.userName,
    category: category.value,
    title: title.value,
    thumbnail: thumbnail,
    content: content.value,
  };

  if (isModify == undefined) {
    postBoard(params).then((res) => {
      if (res.data.status == 200) {
        alert('게시글 작성이 완료되었습니다.');
        router.push('/');
      } else {
        alert('다시 시도해주세요.');
      }
    });
  } else {
    const boardId = boardInfo.boardId;

    const params = {
      category: category.value,
      title: title.value,
      thumbnail: thumbnail,
      content: content.value,
      boardId: boardId,
    };

    updateBoardFromId(params).then(() => {
      alert('게시글 수정이 완료되었습니다.');
      router.go(-1);
    });
  }
};

const getFirstImage = () => {
  const regex = /(<img[^>]*src\s*=\s*["']?([^>"']+)["']?[^>]*>)/;
  if (regex.test(content.value)) {
    return regex.exec(content.value)[2];
  } else {
    return '';
  }
};

const onEditorReady = (editor) => {
  function imageHandler() {
    // 1. 이미지를 저장할 input type=file DOM을 만든다.
    const input = document.createElement('input');
    // 속성 써주기
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.
    // input이 클릭되면 파일 선택창이 나타난다.

    // input에 변화가 생긴다면 = 이미지를 선택
    input.addEventListener('change', async () => {
      const file = input.files[0];
      const fd = new FormData(); //반드시 필요
      fd.append('img', file); //4번
      try {
        postImage(fd).then((imgUrl) => {
          // 현재 에디터 커서 위치 조회
          const range = editor.getSelection();

          // 커서 위치에 이미지 삽입
          editor.insertEmbed(range.index, 'image', imgUrl);

          getFirstImage();
        });
      } catch (error) {
        console.log(error);
      }
    });
  }

  editor.getModule('toolbar').addHandler('image', imageHandler);
};

onMounted(() => {
  if (boardInfo != undefined) {
    title.value = boardInfo.title;
    category.value = boardInfo.category;
    content.value = boardInfo.content;
  }
});
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
select,
.submit {
  margin-left: 10px;
  border: 1px gray solid;
  border-radius: 5px;
  padding: 5px;
}
</style>
