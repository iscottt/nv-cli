<template>
	这是文章列表页。包含分类页、tag页等。
	<ul>
		<li v-for="post in articles_REF">
			<router-link :to="`/${post.slug}`">{{post.title || '未标题'}}</router-link>
		</li>
	</ul>
	<mainPagination />
</template>

<script setup>
import {onMounted,ref,watch,computed} from 'vue';
import $store from "/@/store.js"
import {$axios, $API}from "/@/functions"

import mainPagination from "/@/components/mainPagination.vue"

var articles_REF = ref([]);

var request_post_list = ()=>{
	var tax_query = undefined;
	if ($store.state.term_slug && $store.state.taxonomy) {
		tax_query = {
			opts: [{
				taxonomy: $store.state.taxonomy,
				terms: [$store.state.term_slug]
			}]
		}
	}
	$axios({
		method: 'post',
		url: $API+"/nv/front-stage/get-post-list",
		data: {
			post_type: 'article',
			tax_query,
			current_page: $store.state.current_page,
			posts_per_page: 10,
		},
	})
	.then(({data})=>{
		articles_REF.value = data.data;

		// 检查是不是没有获取到数据。total是0 || current_page大于总的可能分页数。返回没有相关数据页面
		var {total,posts_per_page,current_page} = data.pagination;
		if (!total || !posts_per_page || !current_page || (Math.ceil(total / posts_per_page) < current_page) ) {
			$router.replace({name:'nothing-is-here'})
		} else {
			$store.state.posts_per_page = posts_per_page;
			$store.state.total = total;
		}
	})
	.catch((error)=>{
	})
	.finally(()=>{
	})
}

onMounted(request_post_list)

</script>

<style lang="less">
	
</style>