import type { PropType } from 'vue'
import type { Color as _, GColorHueSliderProps } from '@lingjhf/guava'
import { defineComponent, h } from 'vue'
import '@lingjhf/guava/lib/color-hue-slider'

export default defineComponent({
  props: {
    color: Object as PropType<GColorHueSliderProps['color']>,
    vertical: Boolean as PropType<GColorHueSliderProps['vertical']>,
    size: Object as PropType<GColorHueSliderProps['size']>,
    sliderSize: Object as PropType<GColorHueSliderProps['sliderSize']>,
    change: Function as PropType<GColorHueSliderProps['change']>,
  },
  setup(props) {
    return () =>
      h('g-color-hue-slider', {
        color: props.color,
        vertical: props.vertical,
        size: props.size,
        'slider-size': props.sliderSize,
        ref(ref: unknown) {
          const dom = ref as GColorHueSliderProps
          if (props.change) {
            dom.change = props.change
          }
        },
      })
  },
})
