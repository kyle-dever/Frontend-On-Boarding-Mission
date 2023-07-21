<template>
  <div>
    <b-card-group deck>
      <b-card
        v-for="item in props.items"
        :key="item.board_id"
        tag="article"
        style="max-width: 20rem"
        class="mb-2"
        :img-src="`${item.image}`"
        img-alt="Image"
        img-top
        @click="handleCardClick(item.board_id)"
      >
        <b-card-text>
          <tr>
            <td class="text-center">{{ item.title }}</td>
            <td class="text-center">{{ item.writer }}</td>
            <td class="text-center">{{ item.created_at }}</td>
          </tr>
        </b-card-text>
      </b-card>
    </b-card-group>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
const props = defineProps(['items']);
const emit = defineEmits();

function handleCardClick(board_id) {
  emit('card-click', board_id);
}
</script>
