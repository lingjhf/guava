import type { PropType } from 'vue'
import type { GProgressProps } from '@lingjhf/guava'
import { defineComponent, h } from 'vue'
import { slotToDom } from './utils'
import '@lingjhf/guava/lib/progress'

export default defineComponent({
  props: {
    percentage: Number as PropType<GProgressProps['percentage']>,
    colors: [Array, Function] as PropType<GProgressProps['colors']>,
  },
  setup(props, { slots }) {
    return () =>
      h('g-progress', {
        percentage: props.percentage,
        ref(ref: unknown) {
          const dom = ref as GProgressProps
          if (typeof props.colors === 'function') {
            dom.colors = props.colors
          }
          dom.text = (value: number) => {
            let renderEl: HTMLElement | null = null
            slotToDom(slots, 'text', { value }, (el) => {
              renderEl = el
            })
            return renderEl
          }
        },
      })
  },
})
