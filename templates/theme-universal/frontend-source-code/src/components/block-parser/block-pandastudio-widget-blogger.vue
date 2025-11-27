<template>
	<div
	class="pandastudio-widget-blogger flex items-center g-8"
	>
		<div
		class="avatar"
		:style="{'background-image':`url('${$props.data.avatar_url}')`}"
		></div>
		<div class="metas">
			<div class="name">{{$props.data.name}}</div>
			<div class="description text-embossed">{{$props.data.description}}</div>
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
<style lang="less">
.pandastudio-widget-blogger {
	.avatar {
		width: 72px;
		height: 72px;
		border-radius: .8em;
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		box-shadow: 0 13px 15px var(--primary-gray-opacity-3);
	}
	.name {
		font-size: 120%;
		color: var(--text-color-2);
		text-shadow: 2px 2px 2px var(--gray-opacity-2),-1px -1px var(--white-default);
	}
	.description {
		color: var(--text-color-3);
	}
}
</style>