<template>
	<div class="header" :style="{backgroundImage:`url(${$store.state.theme_settings.playground_top_image})`}">
		<NvMenu :menu="menu_data_REF" v-if="menu_data_REF.length" />
		<span v-else>顶部菜单位置，当前没有菜单。请添加菜单：后台/外观/菜单</span>
	</div>
</template>

<script setup>
import {onMounted,ref} from 'vue';
import $store from "/@/store.js"
import {$axios, $API}from "/@/functions"
import NvMenu from "./nv-menu.vue"

var menu_data_REF = ref([]);

onMounted(()=>{
	$axios({
		method: 'post',
		url: $API+"/nv/get_nav_menu",

	})
	.then(({data})=>{
		menu_data_REF.value = data.topNav || [];
	})
	.catch((error)=>{
		console.log(error)
	})
	.finally(()=>{
	})
})
</script>

<style lang="less">
.header {
	background-size: cover;
	background-position: center;
	background-color: #ddd;
	padding: 5em 1em 1em;
	ul {
		padding: 0;
		display: flex;
		gap: 8px;
		li {
			display: inline-flex;
			&:hover > .submenu {
				display: flex;
			}
		}
	}
	.submenu {
		position: absolute;
		margin-top: 1.25em;
		display: none;
	}
}
</style>