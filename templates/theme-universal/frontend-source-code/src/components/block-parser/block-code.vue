<template>
	<div class="code" :data-lang="data.language">
		<pre><code :data-language="data.language">{{data.pre}}</code></pre>
	</div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
	name: 'block-code',
	props: {
		data: {
			type: Object
		}
	},
})
</script>
<style scoped lang="less">
div {
	line-height: 1.1em;
	tab-size: 4;
	position: relative;
	margin: 1em 0;
}
button {
	font-size: 14px;
	padding: 0;
	width: 2.2em;
	height: 2.2em;
	border-radius: 50%;
	border: none;
	position: absolute;
	cursor: pointer;
	top: 0;
	right: 0;
	transform: translateX(-30%) translateY(-50%);
	color: #fff;
	background: linear-gradient(var(--analogous-color),var(--primary-color));
	box-shadow: 0 3px 4px var(--primary-opacity-3);
	transition: .35s;
	&:hover {
		transform: translateX(-30%) translateY(-50%) scale(1.2);
		transition: cubic-bezier(.5,4,.65,1) .5s;
	}
}
.code pre {
	max-height: 300px;
	margin: 0;
	padding: 1em 1.2em;
	overflow: auto;
	background: #282c34;
	border-radius: .5em;
	box-shadow: 0 .5em 1em var(--gray-opacity-2);
}
.code pre code {
	overflow: visible;
	font-family: Menlo, Monaco, Consolas, Courier New, monospace;
	font-size: 85%;
	padding: 0;
	background: transparent;
	color: #fff;
}
</style>
