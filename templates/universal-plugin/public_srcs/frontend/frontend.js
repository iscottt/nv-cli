import { nextTick, createApp } from 'vue';

// 通过require.context引入frontend-ui.js
const components = require.context('./', true, /frontend-ui\.js$/);
components.keys().forEach(i => {
  var config = components(i).default;
  var type = config.block_type.replace(/\//g, '-');
  var default_data = {};

  Object.keys(config.attributes).forEach(key => {
    var value = config.attributes[key]
    if (typeof (value) == 'function') {
      default_data[key] = value();
    } else {
      default_data[key] = value;
    }
  })

  customElements.define(`nv-block-${type}`, class extends HTMLElement {
    constructor() {
      super();
      nextTick(() => {
        createApp(config.render, {
          data: this.data || default_data
        })
          .mount(this)
      })
    }
  })
})
