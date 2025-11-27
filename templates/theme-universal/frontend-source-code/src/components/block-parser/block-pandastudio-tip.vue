<template>
	<div class="nv-block-wrapper">
		<div
		class="nv-tip"
		:class="{
			error: data.type=='error',
			warning: data.type=='warning',
			success: data.type=='success'
		}"
		>
			<span class="icon" v-html="data.icon"></span>
			<div class="title" v-html="data.title" v-if="data.title"></div>
			<p
			v-if="'string' == typeof(data.text)"
			class="content"
			v-html="data.text"></p>
			<blockParser
			v-else
			class="nested-blocks content"
			:blocks="data.text.blocks" />
		</div>
	</div>
</template>
<script>
import { defineComponent,computed } from "vue";
import blockParser from "/@/components/block-parser/parser.vue"
export default defineComponent({
	name: 'block-tip',
	props: {
		data: {
			type: Object
		}
	},
	components: {blockParser}
})
</script>
<style lang="less" scoped>
.nv-tip {
	--text-color: var(--primary-color);
	--border-color: var(--primary-opacity-1);
	margin: .4em 0;
	background: var(--primary-opacity-1);
	padding: 1px 1.5em;
	border-radius: .5em;
	position: relative;
	// border: 1px solid var(--primary-opacity-1);
	box-shadow: 0 0 0 1px var(--border-color) inset;
	p {
		outline: none;
		margin: 1em 0;
	}
	.title {
		outline: none;
		margin: 1em 0 -.5em;
		color: var(--text-color);
		line-height: 1.6;
	}
	.content {
		margin: .6em 0;
	}
	&.success {
		--text-color: var(--success-color);
		background: rgba(103,194,58,.1);
		--border-color: var(--success-opacity-1);
		.content {
			color: #36661f;
		}
	}
	&.warning {
		--text-color: var(--warning-color);
		background: rgba(230,162,60,.1);
		--border-color: var(--warning-opacity-1);
		.content {
			color: #66481b;
		}
	}
	&.error {
		--text-color: var(--error-color);
		background: rgba(245,108,108,.1);
		--border-color: var(--error-opacity-1);
		.content {
			color: #662d2d;
		}
	}
	.icon {
		line-height: 1;
		font-style: normal;
		font-size: 3.25em;
		position: absolute;
		right: .25em;
		top: .25em;
		color: var(--text-color);
		opacity: .3;
		pointer-events: none;
		user-select: none;
	}
}
</style>
<style lang="less">
.is-dark {
	.nv-tip {
		.content {
			color: var(--text-color-2) !important;
		}
	}
}
</style>