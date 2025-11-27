<template>
	<div
	class="pandastudio-widget-toc mb-10"
	v-show="titles_REF.length"
	>
		<ul>
			<template v-for="block in titles_REF">
				<li
				@click="handleTitleClick(block.id)"
				class="block cursor-hand"
				:class="{
					active: activeIds_REF.includes(block.id),
					'text-primary': activeIds_REF.includes(block.id),
					'text-bulge-primary': activeIds_REF.includes(block.id),
					'text-embossed': !activeIds_REF.includes(block.id)
				}"
				:data-header-level="block.data.level || (block.data.tag == 'h2' ? 2 : 3)"
				v-html="block.data.text"
				></li>
			</template>
		</ul>
	</div>
</template>
<script setup>
import {ref,onMounted,inject,watch,onUnmounted,computed} from "vue";
var post_REF = inject('$post', {value:{id:0}});

var titles_REF = ref([]);

var lastHidedHeaderId_REF = ref('');
var getLastHidedHeaderId = ()=>{
	var ids = [];
	var scrollTop = document.documentElement.scrollTop;
	// 滚动的时候查看有哪些 h2什么的标签被滚到顶部去了
	document.querySelector('.main-content article.nv-blocks')
	.querySelectorAll('h2,h3').forEach(header=>{
		if (header.getBoundingClientRect().top <= 80) {
			var id = header.getAttribute('data-block-id')
					|| header.parentNode.getAttribute('data-block-id')
					|| header.parentNode.parentNode.getAttribute('data-block-id')
			if (id) {
				ids.push(id)
			}
		}
	});
	lastHidedHeaderId_REF.value = ids.length ? ids[ids.length - 1] : '';
}

var parse_toc = ()=>{
	if (!post_REF.value.content) { return; }
	// 读取titles
	titles_REF.value = post_REF.value.content.blocks.filter(item => {
		if ( item.type=='header' ) {
			return item.data.level <= 3;
		}
		else if (item.type=='pandastudio/title') {
			return ['h2','h3'].includes(item.data.tag);
		}
		else {
			return false;
		}
	});
}

// 分析activeiDs
var activeIds_REF = computed(()=>{
	var last = lastHidedHeaderId_REF.value;
	var result = [];
	var getPrevId = (currentId) => {
		if (currentId) {
			var currentLevel = 0;
			var currentBlock = titles_REF.value.filter(block=>block.id == currentId);
			if (currentBlock.length) {
				currentLevel = currentBlock[0].data.level || (currentBlock[0].data.tag == 'h2' ? 2 : 3);
			}
			var lastLevel = currentLevel - 1;
			if (lastLevel > 0) {
				// 从当前的block反向找回去
				var cuttedTitles = titles_REF.value.slice(0,titles_REF.value.indexOf(currentBlock[0]));
				for (var i = cuttedTitles.length - 1; i >= 0; i--) {
					var block = cuttedTitles[i];
					var level = block.data.level || (block.data.tag == 'h2' ? 2 : 3);
					if (level == lastLevel) {
						return block.id;
					}
				}
			}
		}
		return "";
	}
	while(last) {
		result.push(last);
		last = getPrevId(last);
	}
	return result;
})

watch(post_REF, ()=>{parse_toc()})

onMounted(()=>{
	addEventListener('scroll',getLastHidedHeaderId);
	parse_toc();
})

onUnmounted(()=>{
	removeEventListener('scroll',getLastHidedHeaderId)
})

var handleTitleClick = id=> {
	window.scrollTo({
		top: document.querySelector(`[data-block-id="${id}"]`).offsetTop - 56,
		left: 0,
		behavior: 'smooth'
	})
}

</script>

<style lang="less">
.pandastudio-widget-toc {
	ul {
		padding: 0;
		margin: 0 0 0 -20px;
	}
	li {
		list-style: none;
		border-left: 2px solid transparent;
		padding: .35em 20px;
		border-radius: 0 .5em .5em 0;
		transition: .35s;
		&:not(.active) {
			opacity: .9;
		}
		&:hover {
			color: var(--primary-color);
		}
	}
	[data-header-level='2'].active {
		border-left-color: var(--primary-color);
		background-color: var(--primary-opacity-15);
	}
	[data-header-level='3'] {
		padding-left: 36px;
	}
}
</style>