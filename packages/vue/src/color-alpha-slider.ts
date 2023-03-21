import type { PropType } from 'vue'
import type { Color, GColorAlphaSliderProps } from '@lingjhf/guava'
import { defineComponent, h } from 'vue'
import '@lingjhf/guava/lib/color-alpha-slider'

export default defineComponent({
  props: {
    color: Object as PropType<GColorAlphaSliderProps['color']>,
    vertical: Boolean as PropType<GColorAlphaSliderProps['vertical']>,
    size: Object as PropType<GColorAlphaSliderProps['size']>,
    sliderSize: Object as PropType<GColorAlphaSliderProps['sliderSize']>,
  },
  emits: ['change'],
  setup(props, { emit }) {
    function change(color: Color) {
      emit('change', color)
    }
    return () =>
      h('g-color-alpha-slider', {
        color: props.color,
        vertical: props.vertical,
        size: props.size,
        'slider-size': props.sliderSize,
        ref(ref: unknown) {
          const dom = ref as GColorAlphaSliderProps
          if (!dom) return
          dom.change = change
        },
      })
  },
})
