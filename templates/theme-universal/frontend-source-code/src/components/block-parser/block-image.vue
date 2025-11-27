<template>
	<div
	class="nv-block-wrapper nv-image"
	:class="{
		'align-left':data.align=='left',
		'align-center':data.align=='center',
		'align-right':data.align=='right',
		'align-full':data.align=='full',
	}">
		<img
		:class="{
			rounded: data.rounded,
			shadow: data.shadow,
			'cursor-pointer': data.href,
		}"
		:src="data.src"
		:style="image_style()"
		@click="handleClick"
		/>
	</div>
</template>
<script>
import { defineComponent,computed } from "vue";
import nullBlock from "./null.vue"
import createLightbox from "./create-lightbox.js"
export default defineComponent({
	name: 'block-image',
	props: {
		data: {
			type: Object
		}
	},
	components: {
		nullBlock
	},
	methods:{
		handleClick(event) {
			if (this.data.href && !this.data.opennew) {
				event.preventDefault()
				createLightbox(this.data.href)
				return;
			}
			if (this.data.href && this.data.opennew) {
				window.open(this.data.href)
				return;
			}
		},
		image_style() {
			if (this.data.align == 'full') {
				return {}
			} else {
				return {
					width: this.data.width ? `${this.data.width}px` : 'auto',
					height: this.data.height ? `${this.data.height}px` : 'auto'
				}
			}
		}
	}
})
</script>
<style scoped lang="less">
img {
	display: block;
	max-width: 100%;
	&.cursor-pointer {
		cursor: pointer;
	}
}
.rounded {
	border-radius: .5em;
}
.shadow {
	box-shadow: 0 10px 10px var(--gray-opacity-1);
}
.nv-image.align-left img {
	margin-right: auto;
}
.nv-image.align-center img {
	margin-left: auto;
	margin-right: auto;
}
.nv-image.align-right img {
	margin-left: auto;
}
.nv-image.align-full {
	margin-left: -3em;
	margin-right: -3em;
}
@media (max-width: 577px) {
	.nv-image.align-full {
		margin-left: -1em;
		margin-right: -1em;
	}
}
.nv-image.align-full img {
	width: 100%;
}
</style>

<style>
.nv-columns .nv-image:only-child img {
	margin-top: -.4em;
	margin-bottom: -.4em;
}
@media (max-width: 577px) {
	.nv-columns.column-on-mobile > .nv-col > div > .nv-image:only-child:not(.align-full) img {
		margin-left: auto;
		margin-right: auto;
	}
}
</style>