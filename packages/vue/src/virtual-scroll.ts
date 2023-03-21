import type { PropType } from 'vue'
import type { GVirtualScrollProps } from '@lingjhf/guava'
import { defineComponent, h } from 'vue'
import '@lingjhf/guava/lib/virtual-scroll'

export default defineComponent({
  props: {
    horizontal: Boolean as PropType<GVirtualScrollProps['horizontal']>,
    scrollChange: Function as PropType<GVirtualScrollProps['scrollChange']>,
  },
  emits: ['scrollChange'],
  setup(props, { slots, emit }) {
    function scrollChange(value: number) {
      emit('scrollChange', value)
    }
    return () =>
      h(
        'g-virtual-scroll',
        {
          horizontal: props.horizontal,
          ref(ref: unknown) {
            const dom = ref as GVirtualScrollProps
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
