import type { PropType } from 'vue'
import type { Color as _, GColorAlphaSliderProps } from '@lingjhf/guava'
import { defineComponent, h } from 'vue'
import '@lingjhf/guava/lib/color-alpha-slider'

export default defineComponent({
  props: {
    color: Object as PropType<GColorAlphaSliderProps['color']>,
    vertical: Boolean as PropType<GColorAlphaSliderProps['vertical']>,
    size: Object as PropType<GColorAlphaSliderProps['size']>,
    sliderSize: Object as PropType<GColorAlphaSliderProps['sliderSize']>,
    change: Function as PropType<GColorAlphaSliderProps['change']>,
  },
  setup(props) {
    return () =>
      h('g-color-alpha-slider', {
        color: props.color,
        vertical: props.vertical,
        size: props.size,
        'slider-size': props.sliderSize,
        ref(ref: unknown) {
          const dom = ref as GColorAlphaSliderProps
          if (props.change) {
            dom.change = props.change
          }
        },
      })
  },
})
