<template>
	<aside>
		<p>边栏内容是定义的主题模块，本质上是文章。需要用户手动添加并指定为“主题边栏”，当前边栏内容：</p>
		<blockParser :blocks="post_REF.content.blocks" />
	</aside>
</template>

<script setup>
import {onMounted,ref} from 'vue';
import {$axios, $API}from "/@/functions"
import blockParser from "/@/components/block-parser/parser.vue"

var post_REF = ref({content:{blocks:[]}});

var get_sidebar = () => {
	$axios({
		method: 'post',
		url: $API+'/nv/get-theme-modules',
		data: ['aside'] // 在主题里面注册的主题模块叫什么就写什么
	})
	.then(({data})=>{
		if (data.aside) {
			post_REF.value = data.aside
		}
	})
	.catch((error)=>{
		console.log(error)
	})
	.finally(()=>{
	})
}

onMounted(get_sidebar)

</script>

<style lang="less">
aside {
	padding: 1em;
}
</style>