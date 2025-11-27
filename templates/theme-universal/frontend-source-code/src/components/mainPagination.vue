<template>
	页码：
	<ul class="main-pagination">
		<li v-for="i in pageNum">
			<router-link :to="handleRouterTo(i)">{{i}}</router-link>
		</li>
	</ul>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
	name: 'main-pagination',
	computed: {
		pageNum() {
			return Math.ceil(this.$store.state.total/this.$store.state.posts_per_page) || 0;
		}
	},
	data(){return {
		
	}},
	methods: {
		handleRouterTo(page_index) {
			if (!this.$route.name) {
				return {path:"/"};
			}
			if (this.$route.params.current_page) {
				return {
					name: this.$route.name,
					params: {
						current_page: page_index
					}
				}
			} else {
				return {
					name: `${this.$route.name}-paged`,
					params: {
						current_page: page_index
					}
				}
			}
		}
	}
})
</script>

<style lang="less">
.main-pagination {
	display: inline-flex;
	padding: 0;
	margin: 0;
	li {
		display: inline-flex;
	}
}
</style>