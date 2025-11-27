import { createRouter, createWebHistory} from "vue-router";
import $store from "./store";

import Home from "./pages/home/home.vue"
import Search from "./pages/search/search.vue"
import Post from "./pages/post/post.vue"
import Term from "./pages/term/term.vue"
import Four04 from "./pages/404/404.vue"

// ==============================================================
// 【重要】！！！
// Route 配置应该和主题渲染助手配置 nv_render_assistant 保持一致
// ==============================================================
var routes = [{
	path: "/",
	name: "home",
	component: Home,
	meta: {is_home: true},
},
//搜索
{
	path: "/search/:keyword",
	name: "search",
	component: Search,
	meta: {is_search: true},
},
{
	path: "/search/:keyword/page/:current_page(\\d+)",
	name: "search-paged",
	component: Search,
	meta: {is_search: true},
},
//posts
{
	path: "/:post_slug",
	name: "post",
	component: Post,
	meta: {is_post: true},
},{
	path: "/:post_slug/comment-page-:comment_page(\\d+)",
	name: "post-comment-paged",
	component: Post,
	meta: {is_post: true},
},{
	path: "/:post_slug/page/:current_page(\\d+)",
	name: "post-paged",
	component: Post,
	meta: {is_post: true},
},{
	path: "/:post_slug/page/:current_page(\\d+)/comment-page-:comment_page(\\d+)",
	name: "post-paged-comment-paged",
	component: Post,
	meta: {is_post: true},
},
//全部文章
{
	path: "/articles",
	name: "articles",
	component: Term,
	meta: {is_term: true},
},
{
	path: "/articles/page/:current_page(\\d+)",
	name: "articles-paged",
	component: Term,
	meta: {is_term: true},
},
//terms
{
	path: "/:taxonomy/:term_slug",
	name: "term",
	component: Term,
	meta: {is_term: true},
},
{
	path: "/:taxonomy/:term_slug/page/:current_page(\\d+)",
	name: "term-paged",
	component: Term,
	meta: {is_term: true},
},
//404
{
	path: "/nothing-is-here",
	name: "nothing-is-here",
	component: Four04
},
{
	path: "/:pathMatch(.*)*",
	name: "four04",
	component: Four04
},
];

var router = createRouter({
	history: createWebHistory(),
	routes: routes,
	scrollBehavior (to, from, savedPosition) {
		return savedPosition || { top: 0 };
	}
});

router.afterEach((to, from) => {
	if (to.fullPath !== from.fullPath || from.name == undefined) {
		// 地址栏改变，发生了真实的页面跳转
		$store.dispatch('handleRouterChange',to)
	}
})

export default router;
