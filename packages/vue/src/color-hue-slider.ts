import type { PropType } from 'vue'
import type { Color, GColorHueSliderProps } from '@lingjhf/guava'
import { defineComponent, h } from 'vue'
import '@lingjhf/guava/lib/color-hue-slider'

export default defineComponent({
  props: {
    color: Object as PropType<GColorHueSliderProps['color']>,
    vertical: Boolean as PropType<GColorHueSliderProps['vertical']>,
    size: Object as PropType<GColorHueSliderProps['size']>,
    sliderSize: Object as PropType<GColorHueSliderProps['sliderSize']>,
  },
  emits: ['change'],
  setup(props, { emit }) {
    function change(color: Color) {
      emit('change', color)
    }
    return () =>
      h('g-color-hue-slider', {
        color: props.color,
        vertical: props.vertical,
        size: props.size,
        'slider-size': props.sliderSize,
        ref(ref: unknown) {
          const dom = ref as GColorHueSliderProps
          if (!dom) return
          dom.change = change
        },
      })
  },
})
