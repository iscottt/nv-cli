<template>
	<ul
	v-if="menu && !menu.every(item=>item.error)"
	:class="{
		menu: level==0,
		submenu: level > 0,
	}"
	:data-level="level"
	>
		<template v-for="item in menu">
			<li
			v-if="!item.error"
			:class="{
				'has-submenu': item.children && !item.children.every(item=>item.error),
				'is-active': isActiveItem(item),
			}"
			>
			<a-link
			:to="(item.children && !item.children.every(item=>item.error)) ? '' : item.url"
			:target="item.opennew ? '_blank' : '_self'"
			:label="item.label"
			:type="item.type"
			></a-link>
				<NvMenu :menu="item.children" :level="level+1" v-if="item.children && !item.children.every(item=>item.error)" />
			</li>
		</template>
	</ul>
</template>

<script setup>
import { watch,computed,nextTick,ref,reactive,onMounted,onBeforeUnmount } from "vue";
import { useRouter, useRoute } from 'vue-router'
import aLink from './aLink.vue';

var $router = useRouter();
var $route = useRoute();

var $props = defineProps({
	menu: {
		type: Array,
		default(){return []}
	},
	level: {
		type: Number,
		default: 0
	},
})


var isActiveItem = (item)=> {
	var cleanPath = $route.path.replace(/\/\/+/g,'/');

	// 先判断自己是不是 active
	var selfActive = false;
	if (item.url == '') {
		selfActive = false;
	} else if (item.url == '/') {
		selfActive = cleanPath == '/';
	} else {
		selfActive = location.href.includes(item.url.replace(/\/$/,''));
	}

	if (selfActive) {
		// 如果自己是active，那就不用判断children了
		return selfActive;
	} else {
		// 否则需要循环判断 children 是不是 active
		if (item.children && item.children.length > 0) {
			return item.children.some(subItem=>isActiveItem(subItem))
		} else {
			return false;
		}
	}
}
</script>