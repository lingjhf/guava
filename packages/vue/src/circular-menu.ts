import type { PropType } from 'vue'
import type { GCircularMenuProps } from '@lingjhf/guava'
import { defineComponent, h } from 'vue'
import '@lingjhf/guava/lib/circular-menu'
import { slotToDom } from './utils'

export default defineComponent({
  props: {
    menus: Array as PropType<GCircularMenuProps['menus']>,
    x: Number as PropType<GCircularMenuProps['x']>,
    y: Number as PropType<GCircularMenuProps['y']>,
    radius: Number as PropType<GCircularMenuProps['radius']>,
    menuWidth: Number as PropType<GCircularMenuProps['menuWidth']>,
  },
  emits: ['change'],
  setup(props, { slots, emit }) {
    function change(key: string) {
      emit('change', key)
    }
    return () =>
      h('g-circular-menu', {
        x: props.x,
        y: props.y,
        radius: props.radius,
        'menu-width': props.menuWidth,
        ref(ref: unknown) {
          const dom = ref as GCircularMenuProps
          if (!dom) return
          dom.menus = props.menus ?? []
          dom.change = change
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
