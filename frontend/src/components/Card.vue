<template>
  <div>
    <b-row align-h="around">
      <b-card
        v-for="item in props.datas"
        :key="item.board_id"
        :title="item.title"
        img-top
        tag="article"
        style="max-width: 20rem; margin: 50px"
        class="p-0"
        :footer="timestamp(item.created_at)"
        footer-tag="footer"
        footer-class="bg-color-0"
        @click="emits('getBoard', item.board_id)"
      >
        <div class="card-img-container">
          <b-card-img
            v-if="item.thumbnail != ''"
            :src="item.thumbnail"
            alt="image"
            class="center-crop"
          ></b-card-img>
          <b-card-img
            v-else
            :src="`https://www.mogef.go.kr/upload/facilities/noimg_big.gif`"
            alt="noImage"
            class="center-crop"
          ></b-card-img>
        </div>
        <b-card-text
          class="text-right"
          style="margin-top: 10px; margin-left: 0; font-weight: bold"
          >writer: {{ item.writer }}</b-card-text
        >
        <b-card-text
          style="margin-left: 0; font-size: 0.75rem"
          class="two-line-text"
          >{{ parseHtml(item.content) }}</b-card-text
        >
      </b-card>
    </b-row>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import moment from 'moment-timezone';
import 'moment/locale/ko';

moment.tz.setDefault('Asia/Seoul');

const props = defineProps(['datas']);
const emits = defineEmits(['getBoard']);

const parseHtml = (string) => {
  const parsed = string.replace(/<[^>]*>?/g, '');
  return parsed.replace(/&nbsp;/g, ' ');
};

const timestamp = (createdAt) => {
  return moment(createdAt).fromNow();
};
</script>

<style>
.card-img-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px; /* 카드 높이에 맞게 조정 */
  overflow: hidden;
  position: relative;
}

.center-crop {
  object-fit: cover; /* 이미지를 부모 요소에 맞춰 잘라냅니다. */
  object-position: center center; /* 이미지를 중앙에 위치시킵니다. */
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid #000;
}

.two-line-text {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 텍스트를 2줄로 제한 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis; /* ...으로 표시되도록 설정 */
}

.bg-color-0 {
  background-color: #fff;
}
</style>
