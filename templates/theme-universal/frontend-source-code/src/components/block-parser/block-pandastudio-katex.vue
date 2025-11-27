<template>
	<div class="nv-block-wrapper">
		<div
		class="pandastudio-katex"
		v-html="rendered_REF"
		:style="katexStyle()"
		></div>
	</div>
</template>
<script setup>
import katex from "katex"
import "katex/dist/katex.min.css"
import {ref,onMounted} from "vue"
var $props = defineProps({
	data: Object
})
var {data} = $props;

var rendered_REF = ref("");
var createKext = text => {
	if (text) {
		rendered_REF.value = katex.renderToString(text,{
			throwOnError: false
		});
	} else {
		rendered_REF.value = 'KaTeX 公式未输入';
	}
}
onMounted(()=>{
	createKext(data.text)
})

var katexStyle = ()=>{
	var style = {};
	if (data.fontSize) {
		style.fontSize = data.fontSize+'px'
	}
	if (data.color) {
		style.color = data.color;
	}
	if (data.align) {
		style.textAlign = data.align;
	}
	return style;
}

</script>