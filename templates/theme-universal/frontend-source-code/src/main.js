import { createApp } from 'vue'
import App from './App.vue'
import store from "./store"
import router from './router'

const app = createApp(App);

app
.use(store)
.use(router)
.mount('#app')

// parser
import { defineCustomElement,h } from 'vue'
import blockParser from "/@/components/block-parser/parser.vue";
var nestedEl = class extends HTMLElement {
	constructor() {
		super();
		setTimeout(()=>{
			var blocks = this.blocks || [];
			var app = createApp({
				 render() {
				 	return h(blockParser, {blocks})
				 },
			})
			app.mount(this)
		})
	}
}
customElements.define('nv-block-nestedblocks', nestedEl);