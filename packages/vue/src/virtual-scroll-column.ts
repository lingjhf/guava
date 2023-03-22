import { PropType } from 'vue'
import type { GVirutalScrollColumnprops } from '@lingjhf/guava'
import { defineComponent, h } from 'vue'
import '@lingjhf/guava/lib/virtual-scroll-column'
import { slotToDom } from './utils'

export default defineComponent({
  props: {
    items: Array as PropType<GVirutalScrollColumnprops['items']>,
    buffer: Number as PropType<GVirutalScrollColumnprops['buffer']>,
  },
  emits: ['indexRange', 'firstItem', 'lastItem'],
  setup(props, { slots, emit }) {
    function indexRange(startIndex: number, endIndex: number) {
      emit('indexRange', startIndex, endIndex)
    }
    function firstItem() {
      emit('firstItem')
    }
    function lastItem() {
      emit('lastItem')
    }
    return () =>
      h('g-virtual-scroll-column', {
        buffer: props.buffer,
        ref(ref: unknown) {
          const dom = ref as GVirutalScrollColumnprops
          if (!dom) return
          dom.items = props.items ?? []
          dom.indexRange = indexRange
          dom.firstItem = firstItem
          dom.lastItem = lastItem
          if (slots.renderItem) {
            dom.renderItem = (key: string, index: number) => {
              let renderEl: HTMLElement | null = null
              slotToDom(slots, 'renderItem', { key, index }, (el) => {
                renderEl = el
              })
              return renderEl
            }
          }
        },
      })
  },
})
