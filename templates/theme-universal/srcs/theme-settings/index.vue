<template>
	<div class="nv-admin-page">
		<div class="page-title">
			<span>{{$route.meta.title}}</span>
		</div>
		<div class="page-content flex-grow">
			<!-- pd-form 是 nvPress 内置的一个表单组件。你可以使用自己的组件或完全手写表单 -->
			<pd-form :config="formConfig" :data="formData_REF" @submit="handleSubmit"></pd-form>
		</div>
	</div>
</template>

<script setup>
var {ref, onMounted} = nv.Vue;
var {$API, $axios} = nv;

var formConfig = {
	form: {
		labelWidth: "7em",
		size: 'large',
		submitText: "保存设置",
	},
	items: [
		{
			label: "站点身份", type: "FormSubtitle",
		},{
			label: "站点徽标", type: "ThumbnailUploader", prop: "playground_logo_url",
			config: {
				clearable: true,
				width: 140,
				height: 60,
			},
			desc: "显示在页面顶部Logo位置",
		},{
			label: "收藏夹图标", type: "ThumbnailUploader", prop: "playground_favicon_32",
			config: {
				clearable: true,
				width: 140,
				height: 60,
			},
			desc: "显示在浏览器标签左上角，请上传32×32像素的png图片",
		},{
			label: "苹果设备图标", type: "ThumbnailUploader", prop: "playground_apple_touch_icon",
			config: {
				clearable: true,
				width: 140,
				height: 60,
			},
			desc: "显示在iOS、iPadOS主屏幕，请上传大于144×144像素的png图片",
		},{
			label: "页脚版权", type: "Input", prop: "playground_copyright",
			config: {
				placeholder: "请输入...",
				clearable: true,
			},
		},{
			label: "其他设置", type: "FormSubtitle",
		},{
			label: "顶部图片", type: "ThumbnailUploader", prop: "playground_top_image",
			config: {
				clearable: true,
				width: 300,
				height: 100,
			},
			desc: "显示在页面顶部",
		}
	]
}

var formData_REF = ref({});

var $isSuccess = data => {
	if (!data.error) {
		return true;
	} else {
		$message.warning(data.error || '错误：未返回错误原因');
		return false;
	}
}

var requestData = ()=>{
	//从formConfig里面读出需要从后端得到的options数据
	var names = [];
	formConfig.items.forEach(item=>{
		var prop = item.prop;
		if (prop) {
			names.push(prop)
		}
	});
	$fullLoading.start();
	$axios({
		method: 'post',
		url: $API + '/nv/get-options',
		data: {
			names
		}
	})
	.then(({data})=>{
		if (!$isSuccess(data)) {return;}
		formData_REF.value = data;
	})
	.catch((error)=>{
		$message.warning('读取设置请求失败');
		console.log(error)
	})
	.finally(()=>{
		$fullLoading.end();
	})
}

var handleSubmit = ()=>{
	$fullLoading.start();
	$axios({
		method: 'post',
		url: $API + '/nv/set-options',
		data: formData_REF.value
	})
	.then(({data})=>{
		if (!$isSuccess(data)) {return;}
		$message.success('保存成功')
	})
	.catch((error)=>{
		$message.warning('保存设置请求失败');
		console.log(error)
	})
	.finally(()=>{
		$fullLoading.end();
	})
}

onMounted(requestData);
</script>
