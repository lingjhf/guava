import type { GuavaParentProps, Position } from '../types'
import { createEffect, createSignal, type JSX } from 'solid-js'
import { createPressedDrag, generateSplitEventHandlersProps } from '../utils'
import styles from './draggable.module.css'

export interface DraggableProps extends GuavaParentProps<HTMLDivElement> {
  x: number
  y: number
  minX?: number
  minY?: number
  maxX?: number
  maxY?: number
  children?: JSX.Element
  change?: (value: Position) => void
}

export const Draggable = (propsRaw: Partial<DraggableProps>) => {

  const [eventHandlers, props] = generateSplitEventHandlersProps(propsRaw,
    {
      x: 0,
      y: 0
    },
  )

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

  const draggableStyles = () => `left: ${x()}px; top: ${y()}px`

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
    <div class={styles.draggable} ref={setRef} style={draggableStyles()}>
      {props.children}
    </div>
  )
}

