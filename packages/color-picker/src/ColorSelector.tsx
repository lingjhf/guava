import Color from 'color'
import { GDraggable } from '@lingjhf/draggable'
import { Position, Size } from '@lingjhf/utils'
import { createEffect, createSignal } from 'solid-js'
import {
  xTransformSaturation,
  saturationTransformX,
  yTransformValue,
  valueTransformY,
} from './utils'

interface Props {
  color: string
  sliderSize: Size
  onChange: (color: string) => void
}

//滑块默认大小
const defaultSliderSize = { width: 12, height: 12 }

//滑块默认中心位置
const defaultSliderCenter = {
  x: defaultSliderSize.width / 2,
  y: defaultSliderSize.height / 2,
}

export const GColorSelector = (props: Partial<Props>) => {
  let colorSelectorRef: HTMLElement
  const setColorSelectorRef = (el: HTMLElement) => (colorSelectorRef = el)
  let sliderCenter = { x: defaultSliderCenter.x, y: defaultSliderCenter.y }

  const [sliderSize, setSliderSize] = createSignal({
    width: defaultSliderSize.width,
    height: defaultSliderSize.height,
  })
  const [color, setColor] = createSignal(Color())
  const [sliderPosition, setSliderPosition] = createSignal({ x: 0, y: 0 })
  const [sliderBoundary, setSliderBoundary] = createSignal({
    minX: 0,
    minY: 0,
    maxX: 0,
    maxY: 0,
  })

  //监听颜色变化
  createEffect(() => {
    let c: Color
    if (props.color) {
      c = Color(props.color).hsv()
    } else {
      c = Color().hsv()
    }
    //根据颜色设置滑块位置
    setSliderPosition({
      x: saturationTransformX(c.saturationv() / 100, colorSelectorRef.offsetWidth) - sliderCenter.x,
      y: valueTransformY(c.value() / 100, colorSelectorRef.offsetHeight) - sliderCenter.y,
    })
    setColor(c)
  })
  //监听滑块大小变化
  createEffect(() => {
    let _sliderSize: Size
    if (props.sliderSize) {
      _sliderSize = props.sliderSize
    } else {
      _sliderSize = defaultSliderSize
    }
    setSliderSize(_sliderSize)
    sliderCenter = { x: _sliderSize.width / 2, y: _sliderSize.height / 2 }
    //设置滑块边界
    setSliderBoundary({
      minX: 0 - sliderCenter.x,
      minY: 0 - sliderCenter.y,
      maxX: colorSelectorRef.offsetWidth - sliderCenter.x,
      maxY: colorSelectorRef.offsetHeight - sliderCenter.y,
    })
  })
  const styles = () => ({
    background: `linear-gradient(to right, #ffffff 0%, ${Color().hsv(
      color().hue(),
      100,
      100
    )} 100%)`,
  })
  const sliderStyles = () => ({
    width: `${sliderSize().width}px`,
    height: `${sliderSize().height}px`,
  })

  function emitChange() {
    props.onChange?.(color().hexa())
  }

  //x位置换算成饱和度，y位置换算成明度
  function onDraggableChange(value: Position) {
    setColor((c) =>
      c
        .saturationv(
          xTransformSaturation(value.x + sliderCenter.x, colorSelectorRef.offsetWidth) * 100
        )
        .value(yTransformValue(value.y + sliderCenter.y, colorSelectorRef.offsetHeight) * 100)
    )
    emitChange()
  }

  //选择颜色
  function onSelectColor(e: MouseEvent) {
    const mouseOffsetX = e.pageX - colorSelectorRef.offsetLeft
    const mouseOffseY = e.pageY - colorSelectorRef.offsetTop
    setSliderPosition({
      x: mouseOffsetX - sliderCenter.x,
      y: mouseOffseY - sliderCenter.y,
    })
    setColor((c) =>
      c
        .saturationv(xTransformSaturation(mouseOffsetX, colorSelectorRef.offsetWidth) * 100)
        .value(yTransformValue(mouseOffseY, colorSelectorRef.offsetHeight) * 100)
    )
    emitChange()
    expose.onDrag()
  }

  const expose = {
    onDrag() {
      return
    },
  }
  return (
    <div
      ref={setColorSelectorRef}
      style={styles()}
      class="color-selector"
      onMouseDown={onSelectColor}
    >
      <GDraggable
        minX={sliderBoundary().minX}
        minY={sliderBoundary().minY}
        maxX={sliderBoundary().maxX}
        maxY={sliderBoundary().maxY}
        x={sliderPosition().x}
        y={sliderPosition().y}
        onChange={onDraggableChange}
        expose={expose}
      >
        <div class="slider" style={sliderStyles()}></div>
      </GDraggable>
    </div>
  )
}
