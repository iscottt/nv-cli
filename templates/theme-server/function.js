// 直接使用渲染助手
nv_render_assistant({
	// 客户端渲染：“CSR”；服务器端渲染：“SSR”
	rendering_mode: "SSR",
	root_folder: get_theme_path("./web"), // 将这个目录暴露到/目录，允许客户端直接访问到这个目录下的文件
	/* 通用模板参数，默认值如下，一般不用自己改 */
	/*
	template: {
		head: (req,route_name) => `<!DOCTYPE html><html lang="zh-cn"><head>${ nv_head(req,route_name) }</head><body>`,
		foot: (req,route_name) => `</body></html>`,
	},
	*/
	/*
	routes：
	type默认：text/html
	genaral_html默认：true
	status默认：200
	注：只有当 type 是 text/html 【同时】 genaral_html 为true，才使用上面的通用html模板
	*/

	routes: [
		{name: 'home',				path: '/'},
		{name: 'sitemap',			path: '/sitemap.xml', type: 'text/xml', genaral_html: false},
		{name: 'articles',			path: '/articles'},
		{name: 'articles_paged',	path: '/articles/page/:current_page'},
		{name: 'post',				path: '/:post_slug'},
		{name: 'term',				path: '/:taxonomy/:term_slug'},
		{name: 'term_paged',		path: '/:taxonomy/:term_slug/page/:current_page'},
		{name: '404',				path: '*',	status: 404},
	],
})

// 调用了nv_head后，可以使用钩子进行<head>中的内容进行添加，例如：
add_action('nv_head', (req,route) => {
	// nv_enqueue_head方法可以将字符串添加到head
	nv_enqueue_head(`
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,viewport-fit=cover" />
		`)
	// nv_enqueue_style 方法可以将样式添加到head
	nv_enqueue_style(`/style.css`, "theme-style", 1.0);
	nv_enqueue_style(`/block-style.css`, "block-style", 1.0);
	nv_enqueue_script(`/script.js`, "theme-script", 1.0);
},-1)


// 渲染页面body，使用钩子：
// async:nv_render:注册的路由名称
import "./ssr-body.js";
