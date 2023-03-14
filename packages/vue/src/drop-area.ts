import type { PropType } from 'vue'
import type { GDropAreaProps } from '@lingjhf/guava'
import { defineComponent, h } from 'vue'
import '@lingjhf/guava/lib/drop-area'
import { slotToDom } from './utils'

export default defineComponent({
  props: {
    items: Array as PropType<GDropAreaProps['items']>,
    horizontal: Boolean as PropType<GDropAreaProps['horizontal']>,
    switchWhileCrossEdge: Boolean as PropType<GDropAreaProps['switchWhileCrossEdge']>,
  },
  setup(props, { slots }) {
    return () =>
      h('g-drop-area', {
        horizontal: props.horizontal,
        'switch-while-cross-edge': props.switchWhileCrossEdge,
        ref(ref: unknown) {
          const dom = ref as GDropAreaProps
          if (props.items) {
            dom.items = props.items
          }
          if (slots.dropItem) {
            dom.dropItem = (item: unknown, index: number) => {
              let renderEl: HTMLElement | null = null
              slotToDom(slots, 'dropItem', { item, index }, (el) => {
                renderEl = el
              })
              return renderEl
            }
          }
          if (slots.originPlaceholder) {
            dom.originPlaceholder = () => {
              let renderEl: HTMLElement | null = null
              slotToDom(slots, 'originPlaceholder', {}, (el) => {
                renderEl = el
              })
              return renderEl
            }
          }
        },
      })
  },
})
