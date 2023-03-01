import { createEffect, createSignal, JSXElement } from 'solid-js'
import { customElement } from 'solid-element'
import styles from './styles.css?inline'
export interface GDraggableProps {
  x: number
  y: number
  minX: number
  minY: number
  maxX: number
  maxY: number
  children: JSXElement
  onChange: (value: Position) => void
}

customElement<Partial<GDraggableProps>>(
  'g-draggable',
  { x: 0, y: 0, minX: undefined, minY: undefined, maxX: undefined, maxY: undefined },
  (props, { element }) => {
    console.log(props)
    const onChange = (value: Position) => {
      element.dispatchEvent(new CustomEvent('onChange', { detail: value }))
    }
    return (
      <>
        <style>{styles}</style>
        <GDraggable x={props.x} y={props.y} onChange={onChange}>
          <slot></slot>
        </GDraggable>
      </>
    )
  }
)

export const GDraggable = (props: Partial<GDraggableProps>) => {
  const [x, setX] = createSignal(0)
  const [y, setY] = createSignal(0)

  createEffect(() => {
    if (props.x !== undefined) {
      setX(checkXBoundary(props.x))
    }
    if (props.y !== undefined) {
      setY(checkYBoundary(props.y))
    }
  })

  const styles = () => `left: ${x()}px; top: ${y()}px`

  //检查x轴边界
  function checkXBoundary(x: number): number {
    if (props.minX !== undefined && x < props.minX) {
      x = props.minX
    } else if (props?.maxX !== undefined && x > props.maxX) {
      x = props.maxX
    }
    return x
  }

  //检查y轴边界
  function checkYBoundary(y: number): number {
    if (props?.minY !== undefined && y < props.minY) {
      y = props.minY
    } else if (props?.maxY !== undefined && y > props.maxY) {
      y = props.maxY
    }
    return y
  }

  let pressedX = 0
  let pressedY = 0

  function onDrag() {
    window.addEventListener('mousedown', onDragStart)
    window.addEventListener('mousemove', onDragUpdate)
    window.addEventListener('mouseup', onDragEnd)
  }
  function onDragStart(e: MouseEvent) {
    pressedX = e.pageX - x()
    pressedY = e.pageY - y()
  }
  function onDragUpdate(e: MouseEvent) {
    let tempX = e.pageX - pressedX
    let tempY = e.pageY - pressedY
    tempX = checkXBoundary(tempX)
    tempY = checkYBoundary(tempY)
    props.onChange?.({ x: tempX, y: tempY })
    if (tempX != x()) {
      setX(tempX)
    }
    if (tempY != y()) {
      setY(tempY)
    }
  }
  function onDragEnd() {
    window.removeEventListener('mousedown', onDragStart)
    window.removeEventListener('mousemove', onDragUpdate)
    window.removeEventListener('mouseup', onDragEnd)
  }

  return (
    <div class="draggable" style={styles()} onMouseDown={onDrag}>
      {props.children}
    </div>
  )
}
