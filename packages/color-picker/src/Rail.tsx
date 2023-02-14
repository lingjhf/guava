import { GDraggable } from '@lingjhf/draggable'
import { Position, Size } from '@lingjhf/utils'
import { createEffect, createSignal, mergeProps, createMemo } from 'solid-js'

interface Props {
  vertical: boolean
  style: string
  class: string
  size: Size
  sliderSize: Size
  sliderPosition: Position
  onChange?: (value: Position) => void
}

export const GRail = (props: Partial<Props>) => {
  const defaultProps = mergeProps<[Props, ...Partial<Props>[]]>(
    {
      vertical: false,
      style: '',
      class: '',
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
    let styles = `${defaultProps.style}`
    if (defaultProps.vertical) {
      styles = `width:${defaultProps.size.height}px;height:${defaultProps.size.width}px;` + styles
    } else {
      styles = `width:${defaultProps.size.width}px;height:${defaultProps.size.height}px;` + styles
    }
    return styles
  }

  const sliderStyles = () => ({
    width: `${defaultProps.sliderSize.width}px`,
    height: `${defaultProps.sliderSize.height}px`,
  })

  const classes = () => `g-rail ${defaultProps.class}`

  function emitChange() {
    defaultProps.onChange?.(sliderPosition())
  }

  function onDraggableChange(value: Position) {
    setSliderPosition(value)
    emitChange()
  }

  function onSelect(e: MouseEvent) {
    if (defaultProps.vertical) {
      let sliderY = e.pageY - railRef.offsetTop - defaultProps.sliderSize.height / 2
      if (sliderY > sliderMaxX()) {
        sliderY = sliderMaxX()
      }
      if (sliderY < 0) {
        sliderY = 0
      }
      setSliderPosition({ x: 0, y: sliderY })
    } else {
      let slidereX = e.pageX - railRef.offsetLeft - defaultProps.sliderSize.width / 2
      if (slidereX > sliderMaxX()) {
        slidereX = sliderMaxX()
      }
      if (slidereX < 0) {
        slidereX = 0
      }
      setSliderPosition({ x: slidereX, y: 0 })
    }
    expose.onDrag()
    emitChange()
  }

  const expose = {
    onDrag() {
      return
    },
  }

  let railRef: HTMLElement

  const setRailRef = (el: HTMLElement) => (railRef = el)

  return (
    <div ref={setRailRef} style={railStyles()} class={classes()} onMouseDown={onSelect}>
      <GDraggable
        minX={0}
        maxX={sliderMaxX()}
        minY={0}
        maxY={sliderMaxY()}
        x={sliderPosition().x}
        y={sliderPosition().y}
        onChange={onDraggableChange}
        expose={expose}
      >
        <div class="g-slider" style={sliderStyles()}></div>
      </GDraggable>
    </div>
  )
}
