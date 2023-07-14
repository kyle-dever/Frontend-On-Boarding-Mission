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
      <tr v-for="item in props.items" :key="item.id">
        <td class="text-left">{{ item.id }}</td>
        <td class="text-left">{{ item.title }}</td>
        <td class="text-left">{{ item.writer }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps(["items"]);
</script>
