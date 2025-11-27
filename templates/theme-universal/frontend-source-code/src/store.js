import { createStore } from 'vuex'
import { $axios,$API } from './functions'
import router from "./router.js"

var store = createStore({
	state() {return {
		theme_settings: {
			// nvPress配置信息，可能主题需要用得上
			nv_home_url: '',
			nv_site_name: '',
			nv_site_description: '',
			nv_date_format: '',
			nv_time_format: '',
			require_name_email: '',
			comment_registration: '',
			enable_comment: '',
			nv_allow_register: '',

			// 主题后台设置项
			playground_copyright: "", // 页脚版权
			playground_top_image: "", // 顶部图片
		},

		post_slug: "",
		taxonomy: "",
		term_slug: "",
		comment_page: 1,
		current_page: 1,
		// 这两个是发起query之后，后端传回来才有
		posts_per_page: 0,
		total: 0,
	}},
	mutations: {
		setRouteState(state,routeState) {
			Object.keys(routeState).map(key=>{
				state[key] = routeState[key];
			})
		},
	},
	actions:{
		handleRouterChange(context,to) {
			context.commit('setRouteState',{
				is_home: !!to.meta.is_home,
				is_post: !!to.meta.is_post,
				is_term: !!to.meta.is_term,

				post_slug: to.params.post_slug || '',
				taxonomy: to.params.taxonomy || '',
				term_slug: to.params.term_slug || '',
				comment_page: parseInt(to.params.comment_page) || 1,
				current_page: parseInt(to.params.current_page) || 1,

				// 总是重置为0，分页查询后再在组件里面更新它
				posts_per_page: 0,
				total: 0,
			});
		},
	}
})

export default store;