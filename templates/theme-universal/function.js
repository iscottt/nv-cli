import * as fs from "fs";
import { pathToFileURL } from 'url'

import "./function-ssr.js"

// 允许用户在 custom_functions 文件中写自定义function
var custom_function_file = get_theme_path('./custom_functions.js');
if ( fs.existsSync( custom_function_file ) ) {
	await import(pathToFileURL(custom_function_file))
}

// 注册菜单
register_nav_menus({
	topNav: '顶部菜单',
	// ...若有其他菜单可以在这里添加
})

// 注册主题模块，允许用户手动定义边栏显示的内容
register_theme_modules({
    aside: "边栏",
})

// 启用文章密码
add_post_type_support('article', 'password');


// 把主题目录下的srcs文件夹注册为 /playground-srcs 地址，以便url访问。这样添加后台设置页面时component_url才可用
add_action('init_express',()=>{
	register_static_url('/playground-srcs', get_theme_path("./srcs/") );
});

// 添加一个后台设置页面
add_submenu_page({
	parent_slug: "appearance",
	page_title: "主题设置",
	menu_title: "主题设置",
	menu_slug: "theme-settings",
	power: 10,
	position: 9,
	component_url: "/playground-srcs/theme-settings/index.vue",
})

register_rest_route('playground','theme-settings',{
	methods: 'post',
	callback(data,req) {
		var opts = get_options([
			// nvpress基本信息，可能对主题用得上
			'nv_home_url',
			'nv_site_name',
			'nv_site_description',
			'nv_date_format',
			'nv_time_format',
			'require_name_email',
			'comment_registration',
			'enable_comment',
			'nv_allow_register',
			
			// 主题的配置信息
			'playground_copyright',
			'playground_top_image',
			]);
		return opts;
	}
});