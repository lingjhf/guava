import type { PropType } from 'vue'
import type { GScrollAreaProps, ScrollDetail } from '@lingjhf/guava'
import { defineComponent, h } from 'vue'
import '@lingjhf/guava/lib/scroll-area'

export default defineComponent({
  props: {
    scrollX: Number as PropType<GScrollAreaProps['scrollX']>,
    scrollY: Number as PropType<GScrollAreaProps['scrollY']>,
    type: String as PropType<GScrollAreaProps['type']>,
  },
  emits: ['scrollChange'],
  setup(props, { slots, emit }) {
    function scrollChange(value: ScrollDetail) {
      emit('scrollChange', value)
    }
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
            dom.scrollChange = scrollChange
          },
        },
        {
          default: () => (slots.default ? slots.default() : null),
        }
      )
  },
})
