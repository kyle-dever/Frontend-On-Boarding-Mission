<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left" width="10%">번호</th>
        <th class="text-left">제목</th>
        <th class="text-left" width="10%">작성자</th>
        <th class="text-left" width="10%">작성시간</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in props.list"
        :key="item.id"
        @click="handleClick(item.board_id)"
      >
        <td class="text-left">{{ item.board_id }}</td>
        <td class="text-left">{{ item.title }}</td>
        <td class="text-left">{{ item.writer }}</td>
        <td class="text-left">
          {{ moment(item.created_at).format('yyyy-MM-DD HH:mm:ss') }}
        </td>
      </tr>
    </tbody>
  </v-table>
  <b-pagination
    v-model="currentPage"
    :total-rows="props.rows"
    :perPage="perPage"
    align="center"
    @page-click="pageClick"
  ></b-pagination>
</template>

<script setup>
import { ref, defineProps, defineEmits, onBeforeMount } from 'vue';
import moment from 'moment-timezone';
const props = defineProps(['list', 'rows', 'currentPage']);
const emits = defineEmits(['clickedBoard', 'clickedPage']);

const currentPage = ref();
const perPage = 10;

console.log(currentPage);

const handleClick = (id) => {
  emits('clickedBoard', id);
};

const pageClick = (bvEvent, page) => {
  emits('clickedPage', page);
};

onBeforeMount(() => {
  currentPage.value = Number(props.currentPage);
});
</script>
