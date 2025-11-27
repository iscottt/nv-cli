<template>
	<div class="nv-block-wrapper">
		<div
		class="pandastudio-title"
		:data-tag="$props.data.tag"
		:data-style="$props.data.style"
		>
			<component class="title" :is="$props.data.tag" v-html="$props.data.text" />
		</div>
	</div>
</template>
<script setup>

var $props = defineProps({
	data: {
		type: Object
	}
})


</script>
<style scoped lang="less">
.pandastudio-title {
	margin-top: .4em;
	margin-bottom: .4em;
	color: var(--primary-color);
}
.pandastudio-title[data-style="1"] {
	font-size: 1.25em;
	display: grid;
	grid-template-columns: auto auto 1fr;
	align-items: center;
	text-shadow: -1px -1px var(--white-default), 2px 2px 2px var(--primary-opacity-4);
	// --inset: 2.4em;
	margin-right: calc(0px - var(--inset));
	// @media (max-width: 650.5px) {
	// 	--inset: 16px;
	// }

	&:before,.title:before {
		content: "";
		width: 3px;
		display: block;
		background: #000;
		height: 0.85em;
		background: var(--primary-color);
		box-shadow: 1px 0 var(--analogous-color) inset, -1px -1px var(--white-opacity-7), 3px 3px 2px var(--primary-opacity-3);
		transform: skew(-20deg);
	}
	&:before {
		margin-right: 3px;
	}
	.title:before {
		margin-right: .25em;
	}
	
	&:after {
		content: "";
		height: 1px;
		background: var(--primary-gray-opacity-2);
		box-shadow: 0 1px var(--white-default);
	}
	.title {
		font-size: 1em;
		display: flex;
		column-gap: .5em;
		align-items: center;
		margin-right: .5em;
		line-height: 32px;
	}
}

/*.pandastudio-title[data-style="1"] {
	--inset: 3em;
	margin-left: calc(0px - var(--inset));
	margin-right: calc(0px - var(--inset));
	border-bottom: 1px solid var(--border-color);
	padding-left: var(--inset);
	padding-right: var(--inset);
	padding-bottom: 5px;
	position: relative;
	text-shadow: 0 2px 3px var(--primary-opacity-3);
}
.pandastudio-title[data-style="1"] .title {
	font-size: 1.25em;
}
.pandastudio-title[data-style="1"]:after {
	content: "";
	position: absolute;
	bottom: -2px;
	left: var(--inset);
	height: 3px;
	border-radius: 3px;
	width: 2em;
	background: linear-gradient(#33bbff,#1f8bff);
	box-shadow: 0 3px 4px var(--primary-opacity-5);
	transition: .25s;
}
.pandastudio-title[data-style="1"]:hover:after {
	width: 4em;
}
@media (max-width: 650.5px) {
	.pandastudio-title[data-style="1"] {
	  --inset: 1em;
	}
}*/

.pandastudio-title[data-style="2"] {
	border-left: 3px solid var(--primary-color);
	background: var(--primary-opacity-1);
	text-shadow: 0 2px 3px var(--primary-opacity-3), 0 -1px var(--white-default);
	border-radius: 0 8px 8px 0;
	padding: .5em 15px
}
.pandastudio-title[data-style="2"] .title {
	font-size: 1.1875em;
	line-height: 1.8em;
}

.title {
	margin: 0;
	font-weight: normal;
}
</style>