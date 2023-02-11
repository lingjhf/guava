import { createEffect, createSignal, JSXElement } from 'solid-js'
import { ClassList, Position } from '@lingjhf/utils'

interface Props {
  x: number
  y: number
  minX: number
  minY: number
  maxX: number
  maxY: number
  classList: ClassList
  children: JSXElement
  onChange: (value: Position) => void
}

export const GDraggable = (props: Partial<Props>) => {
  const [x, setX] = createSignal(0)
  const [y, setY] = createSignal(0)

  createEffect(() => {
    if (props.x) {
      setX(props.x)
    }
    if (props.y) {
      setY(props.y)
    }
  })
  let pressedX = 0
  let pressedY = 0
  function onDragStart(e: MouseEvent) {
    pressedX = e.pageX - x()
    pressedY = e.pageY - y()
    window.addEventListener('mousemove', onDragUpdate)
    window.addEventListener('mouseup', onDragEnd)
  }
  function onDragUpdate(e: MouseEvent) {
    let tempX = e.pageX - pressedX
    let tempY = e.pageY - pressedY

    if (props.minX !== undefined && tempX < props.minX) {
      tempX = props.minX
    } else if (props?.maxX !== undefined && tempX > props.maxX) {
      tempX = props.maxX
    }
    if (props?.minY !== undefined && tempY < props.minY) {
      tempY = props.minY
    } else if (props?.maxY !== undefined && tempY > props.maxY) {
      tempY = props.maxY
    }
    props.onChange?.({ x: tempX, y: tempY })
    if (tempX != x()) {
      setX(tempX)
    }
    if (tempY != y()) {
      setY(tempY)
    }
  }
  function onDragEnd() {
    window.removeEventListener('mousemove', onDragUpdate)
    window.removeEventListener('mouseup', onDragEnd)
  }

  return (
    <div
      class="absolute"
      classList={props.classList}
      style={{ left: `${x()}px`, top: `${y()}px` }}
      onMouseDown={onDragStart}
    >
      {props.children}
    </div>
  )
}
