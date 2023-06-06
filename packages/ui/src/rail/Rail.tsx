import type { JSX } from 'solid-js'
import type { Size, Position } from '../utils/types'
import { createEffect, createSignal, mergeProps, createMemo } from 'solid-js'
import { customElement } from 'solid-element'
import '../draggable'
import styles from './styles.css?inline'
import { createPressedDrag } from '../utils'

export interface GRailProps {
  vertical: boolean
  size: Size
  sliderSize: Size
  sliderPosition: Position
  children?: JSX.Element | JSX.Element[]
  change?: (value: Position) => void
}

customElement<Partial<GRailProps>>(
  'g-rail',
  {
    vertical: undefined,
    size: undefined,
    sliderSize: undefined,
    sliderPosition: undefined,
    change: undefined,
  },
  (props) => {
    return (
      <>
        <style>{styles}</style>
        <GRail
          vertical={props.vertical}
          size={props.size}
          sliderSize={props.sliderSize}
          change={props.change}
        >
          <slot></slot>
        </GRail>
      </>
    )
  }
)

const GRail = (props: Partial<GRailProps>) => {
  const defaultProps = mergeProps<[GRailProps, ...Partial<GRailProps>[]]>(
    {
      vertical: false,
      size: { width: 168, height: 12 },
      sliderSize: { width: 12, height: 12 },
      sliderPosition: { x: 0, y: 0 },
    },
    props
  )

  const [sliderPosition, setSliderPosition] = createSignal({ x: 0, y: 0 })

  createEffect(() => {
    if (defaultProps.vertical) {
      setSliderPosition({ x: 0, y: defaultProps.sliderPosition.y })
    } else {
      setSliderPosition({ x: defaultProps.sliderPosition.x, y: 0 })
    }
  })

  const sliderMaxX = createMemo(() => defaultProps.size.width - defaultProps.sliderSize.width)
  const sliderMaxY = createMemo(() => defaultProps.size.height - defaultProps.sliderSize.height)

  const railStyles = () => {
    if (defaultProps.vertical) {
      return `width:${defaultProps.size.height}px;height:${defaultProps.size.width}px;`
    }
    return `width:${defaultProps.size.width}px;height:${defaultProps.size.height}px;`
  }

  const sliderStyles = () => ({
    width: `${defaultProps.sliderSize.width}px`,
    height: `${defaultProps.sliderSize.height}px`,
  })

  function emitChange() {
    defaultProps.change?.(sliderPosition())
  }

  function onDraggableChange(value: Position) {
    setSliderPosition(value)
    emitChange()
  }

  function setSliderPositionByMouse(mouseX: number, mouseY: number) {
    const { x, y } = railRef.getBoundingClientRect()
    if (defaultProps.vertical) {
      let sliderY = mouseY - y - defaultProps.sliderSize.height / 2
      if (sliderY > sliderMaxX()) {
        sliderY = sliderMaxX()
      }
      if (sliderY < 0) {
        sliderY = 0
      }
      setSliderPosition({ x: 0, y: sliderY })
    } else {
      let slidereX = mouseX - x - defaultProps.sliderSize.width / 2
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
    <div ref={setRailRef} style={railStyles()} class='rail'>
      {defaultProps.children}
      <g-draggable
        min-x={0}
        max-x={sliderMaxX()}
        min-y={0}
        max-y={sliderMaxY()}
        x={sliderPosition().x}
        y={sliderPosition().y}
        change={onDraggableChange}
      >
        <div class='slider' style={sliderStyles()}></div>
      </g-draggable>
    </div>
  )
}

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'g-rail': Partial<GRailProps>
    }
  }
}
