import Color from 'color'
import { GDraggable } from '@lingjhf/draggable'
import { Position, Size } from '@lingjhf/utils'
import { createEffect, createSignal, mergeProps } from 'solid-js'
import {
  xTransformSaturation,
  saturationTransformX,
  yTransformValue,
  valueTransformY,
} from './utils'

interface Props {
  color: Color
  size: Size
  sliderSize: Size
  onChange: (color: Color) => void
}

export const GColorSelector = (props: Partial<Props>) => {
  let colorSelectorRef: HTMLElement
  const setColorSelectorRef = (el: HTMLElement) => (colorSelectorRef = el)

  const defaultProps = mergeProps<Partial<Props>[]>(
    { size: { width: 240, height: 240 }, sliderSize: { width: 12, height: 12 } },
    props
  )
  let sliderCenter = {
    x: defaultProps.sliderSize!.width / 2,
    y: defaultProps.sliderSize!.height / 2,
  }

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
    if (defaultProps.color) {
      c = defaultProps.color.hsv()
    } else {
      c = Color().hsv()
    }
    //根据颜色设置滑块位置
    setSliderPosition({
      x: saturationTransformX(c.saturationv() / 100, defaultProps.size!.width) - sliderCenter.x,
      y: valueTransformY(c.value() / 100, defaultProps.size!.height) - sliderCenter.y,
    })
    setColor(c)
  })
  //监听滑块大小变化
  createEffect(() => {
    sliderCenter = { x: defaultProps.sliderSize!.width / 2, y: defaultProps.sliderSize!.height / 2 }
    //设置滑块边界
    setSliderBoundary({
      minX: 0 - sliderCenter.x,
      minY: 0 - sliderCenter.y,
      maxX: defaultProps.size!.width - sliderCenter.x,
      maxY: defaultProps.size!.height - sliderCenter.y,
    })
  })
  const styles = () => `
    width:${defaultProps.size!.width}px;
    height:${defaultProps.size!.height}px;
    background: linear-gradient(to right, #ffffff 0%, ${Color().hsv(color().hue(), 100, 100)} 100%)
  `

  const sliderStyles = () => `
    width: ${defaultProps.sliderSize!.width}px;
    height: ${defaultProps.sliderSize!.height}px;
  `

  function emitChange() {
    defaultProps.onChange?.(color())
  }

  //x位置换算成饱和度，y位置换算成明度
  function onDraggableChange(value: Position) {
    setColor((c) =>
      c
        .saturationv(xTransformSaturation(value.x + sliderCenter.x, defaultProps.size!.width) * 100)
        .value(yTransformValue(value.y + sliderCenter.y, defaultProps.size!.height) * 100)
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
        .saturationv(xTransformSaturation(mouseOffsetX, defaultProps.size!.width) * 100)
        .value(yTransformValue(mouseOffseY, defaultProps.size!.height) * 100)
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
