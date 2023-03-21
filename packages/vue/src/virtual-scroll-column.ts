import type { PropType } from 'vue'
import type { GVirutalScrollColumnprops } from '@lingjhf/guava'
import { defineComponent, h } from 'vue'
import '@lingjhf/guava/lib/virtual-scroll'
import { slotToDom } from './utils'

export default defineComponent({
  props: {
    items: Array as PropType<GVirutalScrollColumnprops['items']>,
    buffer: Number as PropType<GVirutalScrollColumnprops['buffer']>,
  },
  setup(props, { slots }) {
    return () =>
      h('g-virtual-scroll-column', {
        buffer: props.buffer,
        ref(ref: unknown) {
          const dom = ref as GVirutalScrollColumnprops
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
        },
      })
  },
})
