import path from 'path'
// 注册静态路径
add_action('init_express', () => {
	register_static_url('/demo-srcs/', path.join(import.meta.dirname, "./dist/"));
	register_static_url('/demo/', path.join(import.meta.dirname, "./"));
});

// 注册编辑器块
register_blocks('/demo-srcs/backend.js')
// 添加头文件
add_action('nv_head', (req, route) => {
	// 主题没有将 vue 暴露出来，因此引入一个vue
	nv_enqueue_script(`/demo/vue.global.prod.v3.2.45.js`, 'vue.global', '3.2.45');
	// 打包好的 web-components
	nv_enqueue_script(`/demo-srcs/frontend.js`);
	nv_enqueue_style(`/demo-srcs/frontend.css`);
})
