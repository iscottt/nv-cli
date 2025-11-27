<template>
	<div class="nv-block-wrapper">
		<div
		class="pandastudio-reply-to-view"
		>
			<template v-if="!data.need_reply">
				<div class="title"><i class="fa-solid fa-lock-open mr-3"></i>评论可见已解锁</div>
				<blockParser
				class="content"
				:blocks="data.content.blocks" />
			</template>
			<template v-else>
				<div class="title text-center">
					<p class="pt-10"><i class="fa-solid fa-lock text-5xl"></i></p>
					<p class="text-md pb-8">站内用户评论可见</p>
				</div>
			</template>
		</div>
	</div>
</template>
<script>
import { defineComponent,computed } from "vue";
import blockParser from "/@/components/block-parser/parser.vue"
export default defineComponent({
	name: 'block-panel',
	props: {
		data: {
			type: Object
		}
	},
	components: {blockParser}
})
</script>
<style scoped>
.pandastudio-reply-to-view {
	border: 1px solid var(--gray-6);
	border-radius: .5em;
	box-shadow: 0 2px 3px rgba(0,0,0,.05);
	overflow: hidden;
}
.pandastudio-reply-to-view > .title {
	font-size: 87.5%;
	padding: .5em 1em;
	line-height: 2em;
	background: var(--gray-8);
	color: var(--gray-4);
	text-shadow: 0 1px var(--white-default);
}
.pandastudio-reply-to-view > .content {
	padding: .75em 1em;
}
</style>