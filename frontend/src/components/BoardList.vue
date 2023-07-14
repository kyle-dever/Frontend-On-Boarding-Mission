<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">번호</th>
        <th class="text-left">제목</th>
        <th class="text-left">작성자</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in props.list"
        :key="item.id"
        @click="handleClick(item.id)"
      >
        <td class="text-left">{{ item.id }}</td>
        <td class="text-left">{{ item.title }}</td>
        <td class="text-left">{{ item.writer }}</td>
      </tr>
    </tbody>
  </v-table>
  <div class="page">
    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :perPage="perPage"
      align="center"
      @page-click="pageClick"
    ></b-pagination>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
const props = defineProps(['list', 'rows']);
const emits = defineEmits(['clickedBoard', 'clickedPage']);

const currentPage = ref(1);
const perPage = 10;
const totalRows = props.rows;

const handleClick = (id) => {
  emits('clickedBoard', id);
};

const pageClick = (bvEvent, page) => {
  emits('clickedPage', page);
};
</script>
