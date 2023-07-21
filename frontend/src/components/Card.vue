<template>
  <div>
    <b-row align-h="around">
      <b-card
        v-for="item in props.datas"
        :key="item.board_id"
        :title="item.title"
        :img-src="item.thumbnail"
        img-alt="No Image"
        img-top
        tag="article"
        style="max-width: 24rem; margin: 20px"
        class="mb-2"
        :footer="timestamp(item.created_at)"
        footer-tag="footer"
        @click="emits('getBoard', item.board_id)"
      >
        <b-card-text>{{ item.writer }}</b-card-text>
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

const timestamp = (createdAt) => {
  return moment(createdAt).fromNow();
};
</script>

<style></style>
