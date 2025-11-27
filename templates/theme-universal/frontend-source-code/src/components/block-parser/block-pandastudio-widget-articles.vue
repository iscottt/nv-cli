<template>
	<div
	class="pandastudio-widget-articles mb-20"
	>
		<template v-if="articles_REF">
			<template v-if="articles_REF.length">
				<template v-for="(item,index) in articles_REF">
					<div class="article mb-10 flex items-center g-8" v-if="index < $props.data.count">
						<router-link :to="`/${item.slug}`" class="thumbnail flex-shrink-0" :style="{backgroundImage: `url('${item.thumbnail}')`}"></router-link>
						<span class="info">
							<router-link :to="`/${item.slug}`" class="title block">{{item.title}}</router-link>
							<span class="metas flex gx-5 mt-1">
								<span class="text-error"><i class="fa-regular fa-heart"></i> {{item.likes}}</span>
								<span class="text-primary"><i class="fa-regular fa-comments"></i> {{item.comments}}</span>
								<span class="text-success"><i class="fa-regular fa-eye"></i> {{item.views}}</span>
							</span>
						</span>
					</div>
				</template>
			</template>
			<template v-else>
				<p class="text-center">暂无数据</p>
			</template>
		</template>
		<template v-else>
			<p>数据读取错误，请刷新</p>
		</template>
	</div>
</template>
<script setup>
import {ref,onMounted,inject} from "vue";
import {$axios, $API}from "/@/functions"
var post_REF = inject('$post', {value:{id:0}});
var $props = defineProps({
	data: {
		type: Object
	}
})

var articles_REF = ref([]);
var request_data = ()=>{
	$axios({
		method: 'post',
		url: $API + "/samsara/widget-articles",
		data:{
			order_type: $props.data.order_type,
			post_id: post_REF.value.id,
		},
	})
	.then(({data})=>{
		// 数据存起来
		if ($props.data.order_type == 'relate') {
			db.relate[post_REF.value.id] = data
		} else {
			db[$props.data.order_type] = data;
		}
		articles_REF.value = data;
	})
	.catch((error)=>{
		articles_REF.value = null;
	})
	.finally(()=>{
		
	})
}
if (!window['pandastudio-widget-articles']) {
	window['pandastudio-widget-articles'] = {
		rand: [],
		likes: [],
		views: [],
		comments: [],
		relate: {
			// 8: [],
			// 2: []
		}
	}
}
var db = window['pandastudio-widget-articles'];
var should_request = (order_type, post_id)=>{
	if (['rand','likes','views','comments'].includes(order_type)) {
		return !db[order_type].length;
	}
	if (order_type == 'relate') {
		if (db.relate[post_id]) {
			return !db.relate[post_id].length;
		} else {
			return true;
		}
	}
}
var get_data = ()=>{
	if (should_request($props.data.order_type, post_REF.value.id)) {
		request_data();
	} else {
		if ($props.data.order_type == 'relate') {
			articles_REF.value = db.relate[post_REF.value.id]
		} else {
			articles_REF.value = db[$props.data.order_type]
		}
	}
}
onMounted(()=>{
	get_data();
})

</script>

<style lang="less">
.pandastudio-widget-articles {
	.thumbnail {
		width: 72px;
		height: 64px;
		border-radius: .5em;
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		box-shadow: 0 13px 15px var(--primary-gray-opacity-3);
	}
	.title {
		color: var(--text-color-2);
		text-shadow: 2px 2px 2px var(--gray-opacity-2), -1px -1px var(--white-opacity-7);
		transition: .25s;
		&:hover {
			color: var(--primary-color);
			text-shadow: 2px 2px 2px var(--primary-opacity-3), -1px -1px var(--white-opacity-7);
		}
	}
	.metas {
		font-size: 14px;
	}
}
</style>