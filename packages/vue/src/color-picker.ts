import type { PropType } from 'vue'
import type { Color as _, GColorPickerProps } from '@lingjhf/guava'
import { defineComponent, h } from 'vue'
import '@lingjhf/guava/lib/color-picker'

export default defineComponent({
  props: {
    color: String as PropType<GColorPickerProps['color']>,
    change: Function as PropType<GColorPickerProps['change']>,
  },
  setup(props) {
    return () =>
      h('g-color-picker', {
        color: props.color,
        ref(ref: unknown) {
          const dom = ref as GColorPickerProps
          if (props.change) {
            dom.change = props.change
          }
        },
      })
  },
})
