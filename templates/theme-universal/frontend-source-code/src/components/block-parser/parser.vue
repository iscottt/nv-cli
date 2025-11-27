<template>
	<component :is="is" class="nv-blocks">
		<p v-if="blocks.length == 0">暂无数据</p>
		<template v-for="block in blocks">
			<component
			v-if="modules[`block-${block.type.replace(/\//g,'-')}`]"
			:is="modules[`block-${block.type.replace(/\//g,'-')}`]"
			:data="block.data"
			:data-block-id="block.id"
			/>
			<component
			v-else
			:is="`nv-block-${block.type.replace(/\//g,'-')}`"
			:data-block-id="block.id"
			.data="block.data"
			/>
		</template>
	</component>
</template>
<script setup>
import { defineAsyncComponent } from "vue";
const files = import.meta.glob('./block-*.vue');
const modules = {}
for (const key in files) {
	modules[key.replace(/(\.\/|\.vue)/g, '')] = defineAsyncComponent(files[key])
}

defineProps({
	is: {
		type: String,
		default: "div",
	},
	blocks: {
		type: Array
	}
})

</script>

<style lang="less">
.nv-blocks {
	line-height: 1.6em;
	color: var(--text-color-2);
	a {
		color: var(--primary-color);
		text-decoration: none;
		text-shadow: 2px 2px 2px var(--primary-opacity-3);
	}
	mark {
		background: var(--background, var(--primary-opacity-1) );
		border-radius: 5px;
		color: var(--color, var(--primary-color));
		padding: 3px 5px;
		margin: 0 3px;
		text-shadow: 0 2px 2px var(--shadow-color,var(--primary-opacity-3)), 0 -1px var(--white-default);
		&.color-danger {
			--background: hsla(0,87%,69%,.1);
			--color: var(--error-color);
			--shadow-color: hsla(0,87%,69%,.3);
		}
		&.color-warning {
			--background: rgba(230,162,60,.1);
			--color: var(--warning-color);
			--shadow-color: rgba(230,162,60,.3);
		}
		&.color-success {
			--background: rgba(103,194,58,.1);
			--color: var(--success-color);
			--cshadow-olor: rgba(103,194,58,.3);
		}
	}
	kbd {
		border: 1px solid var(--border-color);
		padding: .25em;
		border-radius: 5px;
		box-shadow: inset 0 -2px 0 0 var(--gray-opacity-1);
		font-size: .875em;
	}
	&>h2,&>h3,&>h4,&>h5,&>h6 {
		padding: 0.6em 0 3px;
		margin: 0;
		line-height: 1.25em;
		outline: none;
	}
	s {
		opacity: .5;
	}
}
.nv-block-wrapper {
	padding: .4em 0;
}
.block-paragraph {
	margin: 0;
	padding: .4em 0;
	line-height: 2em;
}
</style>