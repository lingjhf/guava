import type { PropType } from 'vue'
import type { GDraggableProps, Position } from '@lingjhf/guava'
import { defineComponent, h } from 'vue'
import '@lingjhf/guava/lib/draggable'

export default defineComponent({
  props: {
    x: Number as PropType<GDraggableProps['x']>,
    y: Number as PropType<GDraggableProps['y']>,
    minX: Number as PropType<GDraggableProps['minX']>,
    minY: Number as PropType<GDraggableProps['minY']>,
    maxX: Number as PropType<GDraggableProps['maxX']>,
    maxY: Number as PropType<GDraggableProps['maxY']>,
    change: Function as PropType<GDraggableProps['change']>,
  },
  emits: ['change'],
  setup(props, { slots, emit }) {
    function change(value: Position) {
      emit('change', value)
    }
    return () =>
      h(
        'g-draggable',
        {
          x: props.x,
          y: props.y,
          'min-x': props.minX,
          'min-y': props.minY,
          'max-x': props.maxX,
          'max-y': props.maxY,
          ref(ref: unknown) {
            const dom = ref as Partial<GDraggableProps>
            if (!dom) return
            dom.change = change
          },
        },
        {
          default: () => (slots.default ? slots.default() : null),
        }
      )
  },
})
