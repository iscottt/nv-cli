<template>
	<div :class="{'hide-symbol': data.hideSymbol}" :style="style_REF" :data-customHeight="data.customHeight"></div>
</template>
<script setup>
import {computed} from "vue"
var $props = defineProps({
	data: Object
});
var style_REF = computed(()=>{
	var customHeight = $props.data.customHeight;
	return customHeight ? {height: `${customHeight}px`} : {}
})
</script>
<style lang="less" scoped>
div {
	text-align: center;
	font-size: 14px;
	display: flex;
	justify-content: center;
	align-items: center;
	&:not(.hide-symbol):before {
		display: inline-block;
		content: "***";
		font-size: 30px;
		letter-spacing: 7.5px;
		color: var(--gray-4);
		text-shadow: 0 2px var(--white-default);
	}
}
</style>