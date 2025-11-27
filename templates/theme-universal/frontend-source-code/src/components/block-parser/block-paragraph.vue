<template>
	<p
	class="block-paragraph"
	:class="{'drop-cap': data.dropCap}"
	:style="{
		fontSize: `${data.fontSize}px`,
		color: data.color,
		textAlign: data.align == 'left' ? '' : data.align,
		fontWeight: `${data.fontWeight}`,
		textIndent: data.textIndent
	}"
	v-html="data.text"></p>
</template>
<script setup>
defineProps({
	data: Object
});
</script>

<style scoped>
.drop-cap:first-letter {
  float: left;
  font-size: 6em;
  margin: .1em .1em 0 0;
}
</style>