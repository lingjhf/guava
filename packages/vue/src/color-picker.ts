import type { PropType } from 'vue'
import type { Color, GColorPickerProps } from '@lingjhf/guava'
import { defineComponent, h } from 'vue'
import '@lingjhf/guava/lib/color-picker'

export default defineComponent({
  props: {
    color: String as PropType<GColorPickerProps['color']>,
    change: Function as PropType<GColorPickerProps['change']>,
  },
  emits: ['change'],
  setup(props, { emit }) {
    function change(color: Color) {
      emit('change', color)
    }
    return () =>
      h('g-color-picker', {
        color: props.color,
        ref(ref: unknown) {
          const dom = ref as GColorPickerProps
          if (!dom) return
          dom.change = change
        },
      })
  },
})
