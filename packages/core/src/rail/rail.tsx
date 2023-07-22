import type { Size, Position, GuavaParentProps } from '../types'
import { createEffect, createSignal, createMemo } from 'solid-js'
import { GDraggable } from '../draggable'
import { createPressedDrag, generateSplitEventHandlersProps } from '../utils'
import styles from './rail.module.css'

export interface RailProps extends GuavaParentProps<HTMLDivElement> {
  vertical: boolean
  size: Size
  sliderSize: Size
  sliderPosition: Position
  change?: (value: Position) => void
}

export const Rail = (propsRaw: Partial<RailProps>) => {

  const [eventHandlers, props] = generateSplitEventHandlersProps(propsRaw, {
    vertical: false,
    size: { width: 168, height: 12 },
    sliderSize: { width: 12, height: 12 },
    sliderPosition: { x: 0, y: 0 },
  })

  const [sliderPosition, setSliderPosition] = createSignal({ x: 0, y: 0 })

  createEffect(() => {
    if (props.vertical) {
      setSliderPosition({ x: 0, y: props.sliderPosition.y })
    } else {
      setSliderPosition({ x: props.sliderPosition.x, y: 0 })
    }
  })

  const sliderMaxX = createMemo(() => props.size.width - props.sliderSize.width)
  const sliderMaxY = createMemo(() => props.size.height - props.sliderSize.height)

  const railStyles = () => {
    if (props.vertical) {
      return `width:${props.size.height}px;height:${props.size.width}px;`
    }
    return `width:${props.size.width}px;height:${props.size.height}px;`
  }

  const sliderStyles = () => ({
    width: `${props.sliderSize.width}px`,
    height: `${props.sliderSize.height}px`,
  })

  function emitChange() {
    props.change?.(sliderPosition())
  }

  function onDraggableChange(value: Position) {
    setSliderPosition(value)
    emitChange()
  }

  function setSliderPositionByMouse(mouseX: number, mouseY: number) {
    const { x, y } = railRef.getBoundingClientRect()
    if (props.vertical) {
      let sliderY = mouseY - y - props.sliderSize.height / 2
      if (sliderY > sliderMaxX()) {
        sliderY = sliderMaxX()
      }
      if (sliderY < 0) {
        sliderY = 0
      }
      setSliderPosition({ x: 0, y: sliderY })
    } else {
      let slidereX = mouseX - x - props.sliderSize.width / 2
      if (slidereX > sliderMaxX()) {
        slidereX = sliderMaxX()
      }
      if (slidereX < 0) {
        slidereX = 0
      }
      setSliderPosition({ x: slidereX, y: 0 })
    }
  }

  function onSelect(e: MouseEvent) {
    setSliderPositionByMouse(e.pageX, e.pageY)
    emitChange()
    createPressedDrag()
      .onUpdate((e) => {
        setSliderPositionByMouse(e.pageX, e.pageY)
        emitChange()
      })
      .action()
  }
  let railRef: HTMLElement
  function setRailRef(el: HTMLElement) {
    railRef = el
    el.addEventListener('mousedown', onSelect)
  }
  return (
    <div ref={setRailRef} style={railStyles()} class={styles.rail}>
      {props.children}
      <GDraggable
        x={sliderPosition().x}
        y={sliderPosition().y}
        minX={0}
        maxX={sliderMaxX()}
        minY={0}
        maxY={sliderMaxY()}
        change={onDraggableChange}
      >
        <div class={styles.slider} style={sliderStyles()}></div>
      </GDraggable>
    </div>
  )
}

