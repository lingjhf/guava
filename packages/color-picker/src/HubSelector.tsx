import Color from 'color'
import { GDraggable } from '@lingjhf/draggable'
import { Position, Size } from '@lingjhf/utils'
import { createEffect, createSignal } from 'solid-js'
import { xTransformHue, hueTransformX } from './utils'

interface Props {
  color: string
  sliderSize: Size
  onChange: (color: string) => void
}

//滑块默认大小
const defaultSliderSize = { width: 12, height: 12 }

export const GHubSelector = (props: Partial<Props>) => {
  let hueSelectorRef: HTMLElement
  const setHueSelectorRef = (el: HTMLElement) => (hueSelectorRef = el)

  const [color, setColor] = createSignal(Color())
  const [sliderSize, setSliderSize] = createSignal({
    width: defaultSliderSize.width,
    height: defaultSliderSize.height,
  })
  const [sliderX, setSliderX] = createSignal(0)
  const [sliderMaxX, setSliderMaxX] = createSignal(0)
  createEffect(() => {
    let c: Color
    if (props.color) {
      c = Color(props.color).hsv()
    } else {
      c = Color().hsv()
    }
    //根据颜色设置滑块位置
    setSliderX(hueTransformX(c.hue(), hueSelectorRef.offsetWidth))
    setColor(c)
  })

  createEffect(() => {
    let _sliderSize: Size
    if (props.sliderSize) {
      _sliderSize = props.sliderSize
    } else {
      _sliderSize = defaultSliderSize
    }
    setSliderSize(_sliderSize)
    //设置滑块边界
    setSliderMaxX(hueSelectorRef.offsetWidth - _sliderSize.width)
  })

  const sliderStyles = () => ({
    width: `${sliderSize().width}px`,
    height: `${sliderSize().height}px`,
  })

  function emitChange() {
    props.onChange?.(color().hexa())
  }

  function onDraggableChange(value: Position) {
    setColor((c) => c.hue(xTransformHue(value.x, hueSelectorRef.offsetWidth - sliderSize().width)))
    emitChange()
  }

  function onSelectHue(e: MouseEvent) {
    let _slidereX = e.pageX - hueSelectorRef.offsetLeft - sliderSize().width / 2
    if (_slidereX > sliderMaxX()) {
      _slidereX = sliderMaxX()
    }
    if (_slidereX < 0) {
      _slidereX = 0
    }
    setSliderX(_slidereX)
    setColor((c) =>
      c.hue(xTransformHue(_slidereX, hueSelectorRef.offsetWidth - sliderSize().width))
    )
    expose.onDrag()
    emitChange()
  }

  const expose = {
    onDrag() {
      return
    },
  }
  return (
    <div ref={setHueSelectorRef} class="hue-selector" onMouseDown={onSelectHue}>
      <GDraggable
        minX={0}
        maxX={sliderMaxX()}
        minY={0}
        maxY={0}
        x={sliderX()}
        onChange={onDraggableChange}
        expose={expose}
      >
        <div class="slider" style={sliderStyles()}></div>
      </GDraggable>
    </div>
  )
}
