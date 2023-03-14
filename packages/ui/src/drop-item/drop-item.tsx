import type { JSX } from 'solid-js'
import { createEffect, createMemo, createSignal, mergeProps, Show } from 'solid-js'
import { customElement } from 'solid-element'
import { useDropArea } from '../drop-area'
import '../draggable'
import { createPressedDrag } from '../utils'
import styles from './styles.css?inline'

export interface GDropItemProps {
  index: number
  placeholder: boolean //是否显示占位符
  render?: () => JSX.Element
}

customElement<Partial<GDropItemProps>>(
  'g-drop-item',
  { index: undefined, placeholder: undefined, render: undefined },
  (props) => {
    return (
      <>
        <style>{styles}</style>
        <GDropItem
          index={props.index}
          placeholder={props.placeholder}
          render={props.render}
        ></GDropItem>
      </>
    )
  }
)

const GDropItem = (props: Partial<GDropItemProps>) => {
  const context = useDropArea()

  let dragItemRef: HTMLElement
  let contentRef: HTMLElement

  const setDragItemRef = (el: HTMLElement) => (dragItemRef = el)
  const setContentRef = (el: HTMLElement) => {
    contentRef = el
    el.addEventListener('mousedown', onStartDrag)
    context?.addItem(defaultProps.index, el)
  }

  const defaultProps = mergeProps<[GDropItemProps, ...Partial<GDropItemProps>[]]>(
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
  const contentStyles = () => (draggable() ? `z-index:99` : 'z-index:0')
  const placeholderstyles = () => {
    const { width, height } = contentRef.getBoundingClientRect()
    return `width:${width}px;height:${height}px`
  }

  function onStartDrag(e: MouseEvent) {
    const firstPageX = e.pageX
    const firstPageY = e.pageY
    const { x, y } = contentRef.getBoundingClientRect()
    const mouseOffsetBoxX = firstPageX - x
    const mouseOffsetBoxY = firstPageY - y
    const pd = createPressedDrag()
    setWidth(dragItemRef.getBoundingClientRect().width)
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
        setDraggable(false)
        setPlaceholder(false)
      })
      .action()
  }

  const content = createMemo(() => (
    <div ref={setContentRef} class="drop-item-content" style={contentStyles()}>
      {defaultProps.render?.()}
    </div>
  ))

  return (
    <div ref={setDragItemRef}>
      <Show when={placeholder()} fallback={content()}>
        <div class="drop-item-placeholder" style={placeholderstyles()}></div>
        <Show when={draggable()}>
          <g-draggable x={itemPosition().x} y={itemPosition().y}>
            <div style={drggableStyles()}>{content()}</div>
          </g-draggable>
        </Show>
      </Show>
    </div>
  )
}

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'g-drop-item': Partial<GDropItemProps>
    }
  }
}
