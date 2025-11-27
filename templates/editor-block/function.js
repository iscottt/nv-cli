import path from 'path'
// 注册静态路径
add_action('init_express', () => {
	register_static_url('/demo-srcs/', path.join(import.meta.dirname, "./dist/"));
});
// 注册编辑器块
register_blocks('/demo-srcs/main.js')
