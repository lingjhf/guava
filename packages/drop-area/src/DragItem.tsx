import { createEffect, createMemo, createSignal, JSX, mergeProps, Show } from 'solid-js'
import { useDropArea } from './DropArea'
import { GDraggable } from '@lingjhf/draggable'
import { createPressedDrag } from '@lingjhf/utils'

interface Props {
  index: number
  placeholder: boolean //是否显示占位符
  children?: JSX.Element | JSX.Element[]
}

export const GDragItem = (props: Partial<Props>) => {
  const context = useDropArea()

  let dragItemRef: HTMLElement
  let contentRef: HTMLElement

  const setDragItemRef = (el: HTMLElement) => (dragItemRef = el)
  const setContentRef = (el: HTMLElement) => {
    contentRef = el
    context?.addItem(defaultProps.index, el)
  }

  const defaultProps = mergeProps<[Props, ...Partial<Props>[]]>(
    {
      index: 0,
      placeholder: false,
    },
    props
  )

  const [placeholder, setPlaceholder] = createSignal(false)
  const [draggable, setDraggable] = createSignal(false)
  const [itemPosition, setItemPosition] = createSignal({ x: 0, y: 0 })
  const [width, setWidth] = createSignal(0)

  createEffect(() => {
    setPlaceholder(defaultProps.placeholder)
  })

  const drggableStyles = () => `width:${width()}px`
  const placeholderstyles = () =>
    `width:${contentRef.offsetWidth}px;height:${contentRef.offsetHeight}px`

  function onStartDrag(e: MouseEvent) {
    const firstPageX = e.pageX
    const firstPageY = e.pageY
    const { x, y } = contentRef.getBoundingClientRect()
    const mouseOffsetBoxX = firstPageX - x
    const mouseOffsetBoxY = firstPageY - y
    const pd = createPressedDrag()
    setWidth(dragItemRef.offsetWidth)
    pd.onUpdate((e: MouseEvent) => {
      const pageX = e.pageX
      const pageY = e.pageY
      if (Math.abs(firstPageX - pageX) > 3 || Math.abs(firstPageY - pageY) > 3) {
        setItemPosition({ x: pageX - mouseOffsetBoxX, y: pageY - mouseOffsetBoxY })
        setDraggable(true)
        setPlaceholder(true)
        context?.switchItem(defaultProps.index, { x: pageX, y: pageY })
      }
    })
      .onEnd(() => {
        setDraggable(true)
        setPlaceholder(false)
      })
      .action()
  }

  const content = createMemo(() => (
    <div ref={setContentRef} class="g-drag-content">
      <div class="g-drag-handle" onMouseDown={onStartDrag}></div>
      {props.children}
    </div>
  ))

  return (
    <div ref={setDragItemRef} class="g-drag-item">
      <Show when={placeholder()} fallback={content()}>
        <div class="g-drag-placeholder" style={placeholderstyles()}></div>
        <Show when={draggable()}>
          <GDraggable classList={{ 'g-index-top': true }} x={itemPosition().x} y={itemPosition().y}>
            <div style={drggableStyles()}>{content()}</div>
          </GDraggable>
        </Show>
      </Show>
    </div>
  )
}
