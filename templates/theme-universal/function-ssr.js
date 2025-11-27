import * as fs from "fs";

// 渲染方法
import "./ssr-head.js"
import "./ssr-body.js"
import "./ssr-blocks.js"

nv_render_assistant({
	rendering_mode: "SSR",
	root_folder: get_theme_path("./web/"), // 把主题的web文件夹作为url的根路径访问
	template: {
		head: (req,route_name) => `<!DOCTYPE html><html lang="zh-cn"><head>${ nv_head(req,route_name) }</head><body><div id="app">`,
		foot: (req,route_name) => `</div></body></html>`,
	},
	
	routes: [
		{name: 'home',				path: '/'},
		{name: 'sitemap',			path: '/sitemap.xml', type: 'text/xml'},
		{name: 'articles',			path: '/articles'},
		{name: 'articles_paged',	path: '/articles/page/:current_page'},
		{name: 'post',				path: '/:post_slug'},
		{name: 'post_comment_paged',path: '/:post_slug/comment-page-:comment_page'},
		{name: 'term',				path: '/:taxonomy/:term_slug'},
		{name: 'term_paged',		path: '/:taxonomy/:term_slug/page/:current_page'},
		{name: '404',				path: '*',	status: 404},
	],
})

// 打包后的Vue脚本和样式，把字符串引入到Head
var theme_scripts_and_styles = fs.readFileSync( get_theme_path("./web/application.html") ,{encoding:"utf8"} );
add_action('nv_head', ()=>{
	nv_enqueue_head(theme_scripts_and_styles)
},99)