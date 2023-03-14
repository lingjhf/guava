import type { PropType } from 'vue'
import type { GScrollAreaProps } from '@lingjhf/guava'
import { defineComponent, h } from 'vue'
import '@lingjhf/guava/lib/scroll-area'

export default defineComponent({
  props: {
    scrollX: Number as PropType<GScrollAreaProps['scrollX']>,
    scrollY: Number as PropType<GScrollAreaProps['scrollY']>,
    type: String as PropType<GScrollAreaProps['type']>,
    change: Function as PropType<GScrollAreaProps['change']>,
  },
  setup(props, { slots }) {
    return () =>
      h(
        'g-scroll-area',
        {
          'scroll-x': props.scrollX,
          'scroll-y': props.scrollY,
          type: props.type,
          ref(ref: unknown) {
            const dom = ref as GScrollAreaProps
            if (!dom) return
            if (props.change) {
              dom.change = props.change
            }
          },
        },
        {
          default: () => (slots.default ? slots.default() : null),
        }
      )
  },
})
