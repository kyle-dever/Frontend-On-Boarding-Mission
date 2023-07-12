<template>
  <div>
      <h4>머신러닝</h4>
      <h3>{{ id }}</h3>
      <b>{{ title }}</b>
  </div>
</template>

/* eslint-disable */
<script setup>
import data from '@/assets/source'
import { ref } from 'vue'

const id = ref('');
const title = ref('');

id.value = data[0].id
title.value = data[0].title
</script>