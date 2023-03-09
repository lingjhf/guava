import { defineComponent, h } from 'vue'
import '@lingjhf/guava/lib/drop-area-group'

export default defineComponent({
  setup(props, { slots }) {
    return () =>
      h('g-drop-area-group', null, {
        default: () => (slots.default ? slots.default() : null),
      })
  },
})
