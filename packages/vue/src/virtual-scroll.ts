import type { PropType } from 'vue'
import type { GVirtualScrollProps } from '@lingjhf/guava'
import { defineComponent, h } from 'vue'
import '@lingjhf/guava/lib/virtual-scroll'
import { slotToDom } from './utils'

export default defineComponent({
  props: {
    items: Array as PropType<GVirtualScrollProps['items']>,
    horizontal: Boolean as PropType<GVirtualScrollProps['horizontal']>,
    buffer: Number as PropType<GVirtualScrollProps['buffer']>,
    change: Function as PropType<GVirtualScrollProps['change']>,
  },
  setup(props, { slots }) {
    return () =>
      h('g-virtual-scroll', {
        horizontal: props.horizontal,
        buffer: props.buffer,
        ref(ref: unknown) {
          const dom = ref as GVirtualScrollProps
          if (!dom) return
          dom.items = props.items ?? []
          if (slots.renderItem) {
            dom.renderItem = (key: string) => {
              let renderEl: HTMLElement | null = null
              slotToDom(slots, 'renderItem', { key }, (el) => {
                renderEl = el
              })
              return renderEl
            }
          }
          if (props.change) {
            dom.change = props.change
          }
        },
      })
  },
})
