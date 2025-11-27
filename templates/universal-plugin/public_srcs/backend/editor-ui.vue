<template>
  <div>{{ data.text }}</div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  block: {
    type: Object,
  }
})
const { data } = props.block;
</script>
