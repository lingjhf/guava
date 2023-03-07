import type { Position } from '../utils/types'
import { createEffect, createSignal, JSXElement } from 'solid-js'
import { customElement } from 'solid-element'
import styles from './styles.css?inline'
import { createPressedDrag } from '../utils'
export interface GDraggableProps {
  x: number
  y: number
  minX: number
  minY: number
  maxX: number
  maxY: number
  children: JSXElement
  change: (value: Position) => void
}

customElement<Partial<GDraggableProps>>(
  'g-draggable',
  {
    x: undefined,
    y: undefined,
    minX: undefined,
    minY: undefined,
    maxX: undefined,
    maxY: undefined,
    change: undefined,
  },
  (props) => {
    return (
      <>
        <style>{styles}</style>
        <GDraggable
          x={props.x}
          y={props.y}
          minX={props.minX}
          maxX={props.maxX}
          minY={props.minY}
          maxY={props.maxY}
          change={props.change}
        >
          <slot></slot>
        </GDraggable>
      </>
    )
  }
)

const GDraggable = (props: Partial<GDraggableProps>) => {
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
    createPressedDrag()
      .onStart((e) => {
        pressedX = e.pageX - x()
        pressedY = e.pageY - y()
      })
      .onUpdate((e) => {
        let tempX = e.pageX - pressedX
        let tempY = e.pageY - pressedY
        tempX = checkXBoundary(tempX)
        tempY = checkYBoundary(tempY)
        props.change?.({ x: tempX, y: tempY })
        if (tempX != x()) {
          setX(tempX)
        }
        if (tempY != y()) {
          setY(tempY)
        }
      })
      .action()
  }
  function setRef(el: HTMLElement) {
    el.addEventListener('mousedown', onDrag)
  }

  return (
    <div class="draggable" ref={setRef} style={styles()}>
      {props.children}
    </div>
  )
}

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'g-draggable': Partial<GDraggableProps>
    }
  }
}
