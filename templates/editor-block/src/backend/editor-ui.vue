<template>
  <div>test</div>
</template>
<script setup>
const $props = defineProps({
  block: {
    type: Object,
  }
})
const { data } = $props.block;
</script>
<style scoped>
</style>
