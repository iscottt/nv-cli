<template>
	<div
	class="nv-block-list-wrapper"
	:style="{
		fontSize: `${data.fontSize}px`,
		color: data.color,
		fontWeight: `${data.fontWeight}`
	}">
		<!-- 包裹一层是为了防止出现序号的bug -->
		<component :is="`${data.style == 'ordered' ? 'ol' : 'ul'}`" class="block-list">
			<li v-for="item in data.items" >
				<div>
					<div v-html="item.content"></div>
					<blockList v-if="item.items && item.items.length > 0" :data="{style:data.style, items: item.items}" />
				</div>
			</li>
		</component>
	</div>
</template>
<script setup>
import { defineComponent,computed } from "vue";
import blockList from "./block-list.vue"
defineProps({
	data: {
		type: Object
	}
})
</script>
<style scoped lang="less">
ol,ul {
	padding-left: 0;
	margin-top: 0;
	margin-bottom: 0;
}
li {
	list-style: none;
	display: flex;
	line-height: 1.8em;
	margin: 2px 0;
	&:before {
		margin-right: .4em;
	}
}
ol {
	counter-reset: i;
	li {
		&:before {
			content: counters(i, ".") ".";
			counter-increment: i;
		}
	}
}
ul {
	li {
		&:before {
			content: "•";
		}
	}
}
</style>