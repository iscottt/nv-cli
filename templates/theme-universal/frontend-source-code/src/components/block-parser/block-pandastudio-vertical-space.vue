<template>
	<div
	class="pandastudio-vertical-space"
	:style="{height:`${$props.data.height}px`}"
	></div>
</template>
<script setup>
var $props = defineProps({
	data: {
		type: Object
	}
})
</script>