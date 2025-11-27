<template>
	<template v-if="data.type == 'ssr-hidden'">
		<blockParser
		pandastudio-hidden="ssr-hidden"
		:blocks="data.content.blocks" />
	</template>
	<div class="nv-block-wrapper" v-else>
		<div
		class="pandastudio-hidden"
		>
			<div class="title text-center" v-if="data.type=='random-password' && input_REF != randomPassword_REF">
				<div class="pt-16"><i class="fa-solid fa-lock text-5xl"></i></div>
				<div class="text-md my-5">当前内容已隐藏，输入密码： {{randomPassword_REF}}</div>
				<div class="text-md pb-16"><input type="number" placeholder="请输入密码..." v-model="input_REF"></div>
			</div>

			<div class="title text-center" v-if="data.type=='password' && input_REF != password">
				<div class="pt-16"><i class="fa-solid fa-lock text-5xl"></i></div>
				<div class="text-md my-5">{{data.passwordTip || '当前内容已隐藏，输入密码'}}</div>
				<div class="text-md pb-16"><input placeholder="请输入密码..." v-model="input_REF"></div>
			</div>

			<template v-if="(data.type=='random-password' && input_REF == randomPassword_REF) || (data.type=='password' && input_REF == password)">
				<div class="title"><i class="fa-solid fa-lock-open mr-3"></i>已解锁</div>
				<blockParser
				class="content"
				:blocks="data.content.blocks" />
			</template>
		</div>
	</div>
</template>
<script setup>
import { computed,ref } from "vue";
import blockParser from "/@/components/block-parser/parser.vue"
var $props = defineProps({
	data: {
		type: Object
	}
})
var randomPassword_REF = ref(parseInt(Math.random()*10000));
var input_REF = ref("");
var password = ref(atob(atob($props.data.password)));

</script>
<style scoped lang="less">
.pandastudio-hidden:not([data-type="ssr-hidden"]) {
	border: 1px solid var(--gray-6);
	border-radius: .5em;
	box-shadow: 0 2px 3px rgba(0,0,0,.05);
	overflow: hidden;
}
.pandastudio-hidden > .title {
	font-size: 87.5%;
	padding: .5em 1em;
	line-height: 2em;
	background: var(--gray-8);
	color: var(--gray-4);
	text-shadow: 0 1px var(--white-default);
}
.pandastudio-hidden > .content {
	padding: .75em 1em;
}
.pandastudio-hidden input {
	border: 1px solid var(--primary-gray-opacity-2);
	background: var(--white-default);
	color: var(--text-color-3);
	font-size: 14px;
	padding: 7px 12px;
	border-radius: 5px;
	transition: .25s;

	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}
	-moz-appearance: textfield;

	&:hover {
		border-color: var(--primary-opacity-5);
	}
	&:focus {
		border-color: var(--primary-color);
		box-shadow: 0 0 0 3px var(--primary-opacity-2);
	}
}
</style>