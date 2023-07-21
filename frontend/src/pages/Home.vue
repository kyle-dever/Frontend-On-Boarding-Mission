<template>
  <div>
    <Card
      v-if="datas"
      class="text-left"
      :items="datas"
      @card-click="handleCardClick"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Card from '@/components/Card';
import { getBoardListAll } from '@/api/boardApi';
import { useRouter } from 'vue-router';

const datas = ref(null);
const router = useRouter();

function getBoardListForHome() {
  getBoardListAll().then((res) => (datas.value = res.data.boards));
}

onMounted(() => {
  getBoardListForHome();
});

const handleCardClick = (board_id) => {
  console.log('Clicked card with board_id:', board_id);

  router.push({
    path: '/board/board',
    query: {
      id: board_id,
    },
  });
};
</script>
