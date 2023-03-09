import type { PropType } from 'vue'
import type { Color as _, GColorSliderProps } from '@lingjhf/guava'
import { defineComponent, h } from 'vue'
import '@lingjhf/guava/lib/color-slider'

export default defineComponent({
  props: {
    color: Object as PropType<GColorSliderProps['color']>,
    size: Object as PropType<GColorSliderProps['size']>,
    sliderSize: Object as PropType<GColorSliderProps['sliderSize']>,
    change: Function as PropType<GColorSliderProps['change']>,
  },
  setup(props) {
    return () =>
      h('g-color-slider', {
        color: props.color,
        size: props.size,
        'slider-size': props.sliderSize,
        ref(ref: unknown) {
          const dom = ref as GColorSliderProps
          if (props.change) {
            dom.change = props.change
          }
        },
      })
  },
})
