
import editor from './editor-ui.vue'
import icon from './icon.vue'
const { register_block_type } = nv.editor.blocks;
export default () => {
  register_block_type("scottstudio/demo", {
    name: "测试块",
    category: 'design',
    description: "测试的块",
    icon,
    attributes: {
      text:''
    },
    editor
  })
}


