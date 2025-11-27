<template>
	<a v-if="to==''" v-html="label">
	</a>
	<a
	v-else-if="type == 'url' && to !== '/'"
	:href="to"
	:target="target"
	rel="noopener noreferrer"
	v-html="label"
	>
	</a>
	<router-link
	v-else
	:to="to.replace($store.state.theme_settings.nv_home_url,'')"
	:target="target"
	:type="type"
	v-html="label"
	>
	</router-link>
</template>
<script setup>
import $store from "/@/store.js"
defineProps({
	to: {
		type: [String,Object],
		required: true
	},
	target: {
		type: String,
		default: '_self'
	},
	label: {
		type: String,
		default: ''
	},
	type: {
		type: String,
	}
})
</script>