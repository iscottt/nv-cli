<template>
	<footer>
		{{$store.state.theme_settings.playground_copyright || 'nvPress © PANDA Studio'}}
	</footer>
</template>

<script setup>
import $store from "/@/store.js";
</script>

<style lang="less">
footer {
	background-color: #ddd;
	text-align: center;
	padding: 1em;
}
</style>