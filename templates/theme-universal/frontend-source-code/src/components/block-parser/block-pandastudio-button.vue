<template>
	<div class="nv-block-wrapper">
		<div
		class="pandastudio-button"
		:data-align="data.align"
		>
			<a class="button flex justify-center items-center" :class="[`style-${data.style||'theme'}`]" :style="style_REF" :href="data.href" :target="data.opennew ? '_blank':'_self'">
				<span class="icon" v-html="data.icon" v-if="data.icon"></span>
				<span class="text" v-html="data.text"></span>
			</a>
		</div>
	</div>
</template>
<script setup>
import { computed } from "vue";
var $props = defineProps({
	data: {
		type: Object,
	}
})

var {data} = $props;

var style_REF = computed(()=>{
	var style = {};
	if (data.width) {
		style.width = `${data.width}%`
	}
	if (data.fontSize) {
		style.fontSize = `${data.fontSize}px`
	}
	if (data.fontWeight) {
		style.fontWeight = `${data.fontWeight}`
	}
	return style;
})

</script>
<style lang="less" scoped>
.pandastudio-button {
	&[data-align="left"] {text-align: left;}
	&[data-align="center"] {text-align: center;}
	&[data-align="right"] {text-align: right;}

	.button {
		display: inline-flex;
		text-align: center;
		text-shadow: none;
		line-height: 1.6;
		.icon {
			margin-right: .375em;
		}
		&.style-theme {
			&:before {
				content: "";
				display: block;
				margin: 0 0.7em;
				height: 50%;
				box-shadow: 0 1px var(--white-default) inset;
				background: linear-gradient(var(--white-default), var(--white-opacity-3));
				border-radius: 9em;
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
			}
			position: relative;
			padding: 6px 1em 4px;
			background: var(--primary-opacity-2) linear-gradient(var(--white-opacity-0) 65%, var(--white-opacity-75));
			box-shadow: 0 0 0 1px var(--white-default) inset, 0 8px 10px var(--primary-gray-opacity-05), 0 8px 10px var(--primary-opacity-2), 0 0 5px var(--primary-opacity-2);
			border-radius: 9em;
			border: none;
			color: var(--primary-color);
			overflow: hidden;
			transition: .25s;
			.text {
				opacity: 0.99;
			}
			&:hover {
				background-color: var(--primary-opacity-3);
				box-shadow: 0 0 0 1px var(--white-default) inset, 0 8px 10px var(--primary-gray-opacity-05), 0 10px 10px var(--primary-opacity-3), 0 0 10px var(--primary-opacity-2);
			}
		}
		&:not(.style-theme) {
			--border-color: var(--gray-3);
			--background-color: var(--gray-9);
			--shadow-color: var(--gray-opacity-2);

			padding: 7px 1em 8px;
			background-color: var(--background-color);
			color: var(--border-color);
			text-shadow: 0 1px var(--white-default);
			border-radius: .375em;
			box-shadow: 0 -2px 1px var(--gray-opacity-2) inset, 0 -3px 0 var(--border-color) inset, 0 0 0 1px var(--border-color) inset, 0 2px var(--white-default) inset,0 .5em 1em var(--white-opacity-6) inset,0 1px 3px var(--gray-opacity-1),0 3px 4px var(--shadow-color);

			&.style-primary {
				--border-color: var(--primary-color);
				--background-color: var(--primary-opacity-1);
				--shadow-color: var(--primary-opacity-3);
			}
			&.style-success {
				--border-color: var(--success-color);
				--background-color: rgba(103, 194, 58, .1);
				--shadow-color: rgba(103, 194, 58, .3);
			}
			&.style-warning {
				--border-color: var(--warning-color);
				--background-color: rgba(230, 162, 60, .1);
				--shadow-color: rgba(230, 162, 60, .3);
			}
			&.style-error {
				--border-color: var(--error-color);
				--background-color: rgba(245, 108, 108, .1);
				--shadow-color: rgba(245, 108, 108, .3);
			}

			transition: box-shadow .15s, transform .15s;
			&:hover {
				transform: translateY(5px);
				padding: 9px 1em 6px;
				box-shadow: 0 -2px 1px transparent inset, 0 -3px 0 transparent inset, 0 0 0 1px var(--border-color) inset, 0 2px 3px var(--gray-opacity-1) inset,0 .5em 1em var(--gray-opacity-1) inset,0 1px 3px var(--gray-opacity-1),0 3px 4px transparent;
			}
		}
	}
}
</style>