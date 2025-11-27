<template>
	<blockParser :blocks="post_REF.content.blocks" />
</template>

<script setup>
import {onMounted,ref} from 'vue';
import {useRouter} from 'vue-router';
import $store from "/@/store.js"
import {$axios, $API}from "/@/functions"

var $router = useRouter();

import blockParser from "/@/components/block-parser/parser.vue"

var post_REF = ref({content:{blocks:[]}});
var password_REF = ref("");

var require_password = ()=>{
	password_REF.value = prompt("请输入密码，留空返回首页", "");
	if (!password_REF.value) {
		$router.push('/')
	} else {
		get_post();
	}
}

var password_error = ()=>{
	alert('密码错误，请重新输入')
	require_password();
}

var get_post = ()=>{
	$axios({
		method: 'post',
		url: $API + '/nv/front-stage/get-post',
		responseType: 'json',
		data:{
			slug: encodeURIComponent(decodeURIComponent($store.state.post_slug)),
			password: password_REF.value,
		},
	})
	.then(({data})=>{
		if (data.error) {
			$router.replace({name:'nothing-is-here'})
			return;
		}
		if (data.require_password && password_REF.value) {
			password_error();
			return;
		}
		if (data.require_password) {
			require_password();
			return;
		}
		post_REF.value = data;
	})
	.catch((error)=>{
	})
	.finally(()=>{
	})
}

onMounted(get_post)

</script>

<style lang="less">
	
</style>