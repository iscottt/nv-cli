<template>
	<topNav />
	<div class="main-wrapper">
		<div class="main">
			<router-view v-slot="{ Component }">
				<component :is="Component" :key="[$store.state.post_slug,$store.state.taxonomy,$store.state.term_slug,$store.state.current_page].toString()" />
			</router-view>
		</div>
		<sideBar />
	</div>
	<Footer />
</template>

<script setup>
import topNav from "/@/components/topNav.vue"
import sideBar from "/@/components/sideBar.vue"
import Footer from "/@/components/footer.vue"
import {onMounted} from 'vue';
import $store from "/@/store.js"
import {$axios, $API}from "/@/functions"

var get_site_metas = () => {
	// 主题配置
	$axios({
		method: 'post',
		url: $API+'/playground/theme-settings',
	})
	.then(({data})=>{
		Object.keys(data).forEach(key=>{
			$store.state.theme_settings[key] = data[key]
		})
	})
	.catch((error)=>{
		console.log(error)
	})
	.finally(()=>{
	})
}

onMounted(get_site_metas)

</script>

<style lang="less">
.main-wrapper {
	display: grid;
	grid-template-columns: 1fr 30%;
	.main {
		border-right: 1px solid #ddd;
	}
}
</style>