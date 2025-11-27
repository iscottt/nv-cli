import editor from './editor-ui.vue'
import icon from './icon.vue'
import settings from './settings-ui.vue'
var { register_block_type } = nv.editor.blocks;
export default () => {
  register_block_type("scottstudio/demo", {
    name: "demo",
    description: "demo",
    icon,
    attributes: {
      text:''
    },
    editor,
    settings
  })
}


