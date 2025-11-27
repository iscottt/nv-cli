<template>
  <div class="scottstudio-admin-ad">
    <editorCollapseBox title="内容" defaultExpanded>
      <div class="nvbe-settings-form-item">
        <div class="nvbe-settings-form-item-title">标题</div>
        <NInput placeholder="请输入..." v-model:value="data.text" />
      </div>
    </editorCollapseBox>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const { editorCollapseBox } = nv.components;
const props = defineProps({
  block: { type: Object }
})
const { data } = props.block
</script>
