<template>
	<p>这里是首页，你可以在这里实现首页的文章展示或者其他个性化首页的内容。</p>
	<p>例如我在这里插入了一个所有文章的链接，点击后跳转到文章列表页。当然，这个文章列表页面的地址不是特定的，而是主题自己分配的：</p>
	<p>
		<router-link to="/articles">查看全部文章</router-link>
	</p>
</template>

<script setup>
import {onMounted,ref} from 'vue';
import $store from "/@/store.js"
import {$axios, $API}from "/@/functions"


</script>

<style lang="less">
	
</style>