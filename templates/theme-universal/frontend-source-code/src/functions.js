const $localStorage = function(name,value) {
	if (arguments.length == 1) {
		//没有value，仅读取
		try{
			var result = JSON.parse(window.localStorage.getItem(name)).v;
		}catch(e){
			var result = window.localStorage.getItem(name);
		}
		return result;
	} else {
		//有value，存储
		window.localStorage.setItem(name,JSON.stringify({v:value}));
	}
}

export {$localStorage};

const $cookies = function(name,value,days) {
	if (arguments.length == 1) {
		//没有value，仅读取
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg)) {
			return decodeURIComponent(arr[2]);
		} else {
			return null;
		}
	} else {
		//有value，存储
		var exp = new Date();
		exp.setTime(exp.getTime() + (days || 0)*24*60*60*1000);
		
		var nameVal = `${name}=${encodeURIComponent(value)};`;
		var expires = days ? `expires=${exp.toGMTString()};` : '';
		var path = 'path=/;';
		var sameSite = 'sameSite=Strict;';
		document.cookie = `${nameVal}${expires}${path}${sameSite}`
	}
}

export {$cookies};

import axios from 'axios'
axios.interceptors.response.use(function (response) {
   // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
}, function (error) {
	// 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response.status == 401) {
    	location.reload();
    }
    return Promise.reject(error);
});

export const $axios = axios;

export const $API = process.env.NODE_ENV === 'production'
											? ''
											: '/vite-proxy';

export const $unbind = obj => JSON.parse(JSON.stringify({a:obj})).a;