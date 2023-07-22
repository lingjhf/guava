import type { Size, Position, GuavaProps } from '../types'
import { createEffect, createSignal } from 'solid-js'
import Color from 'color'
import { createPressedDrag, generateSplitEventHandlersProps } from '../utils'
import { GDraggable } from '../draggable'
import styles from './color-slider.module.css'

export interface ColorSliderProps extends GuavaProps<HTMLDivElement> {
  color: Color
  size: Size
  sliderSize: Size
  change?: (color: Color) => void
}

export const ColorSlider = (propsRaw: Partial<ColorSliderProps>) => {

  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {
      color: Color().hsv(),
      size: { width: 240, height: 240 },
      sliderSize: { width: 12, height: 12 },
    },
  )
  let sliderCenter = {
    x: props.sliderSize.width / 2,
    y: props.sliderSize.height / 2,
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
    //根据颜色设置滑块位置
    setSliderPosition({
      x:
        saturationTransformX(props.color.saturationv() / 100, props.size.width) -
        sliderCenter.x,
      y:
        valueTransformY(props.color.value() / 100, props.size.height) -
        sliderCenter.y,
    })
    setColor(props.color)
  })
  //监听滑块大小变化
  createEffect(() => {
    sliderCenter = { x: props.sliderSize.width / 2, y: props.sliderSize.height / 2 }
    //设置滑块边界
    setSliderBoundary({
      minX: 0 - sliderCenter.x,
      minY: 0 - sliderCenter.y,
      maxX: props.size.width - sliderCenter.x,
      maxY: props.size.height - sliderCenter.y,
    })
  })
  const backgroundStyles = () => `
    width:${props.size.width}px;
    height:${props.size.height}px;
    background: linear-gradient(to right, #ffffff 0%, ${Color().hsv(color().hue(), 100, 100)} 100%)
  `

  const sliderStyles = () => `
    width: ${props.sliderSize.width}px;
    height: ${props.sliderSize.height}px;
  `
  let colorSelectorRef: HTMLElement
  function setColorSelectorRef(el: HTMLElement) {
    colorSelectorRef = el
  }

  function emitChange() {
    props.change?.(color())
  }

  //x位置换算成饱和度，y位置换算成明度
  function onDraggableChange(value: Position) {
    setColor((c) =>
      c
        .saturationv(xTransformSaturation(value.x + sliderCenter.x, props.size.width) * 100)
        .value(yTransformValue(value.y + sliderCenter.y, props.size.height) * 100)
    )
    emitChange()
  }

  //选择颜色
  function onSelectColor(e: MouseEvent) {
    const { x, y } = colorSelectorRef.getBoundingClientRect()
    const mouseOffsetX = e.pageX - x - window.scrollX
    const mouseOffseY = e.pageY - y - window.scrollY
    setSliderPosition({
      x: mouseOffsetX - sliderCenter.x,
      y: mouseOffseY - sliderCenter.y,
    })
    setColor((c) =>
      c
        .saturationv(xTransformSaturation(mouseOffsetX, props.size.width) * 100)
        .value(yTransformValue(mouseOffseY, props.size.height) * 100)
    )
    emitChange()
    createPressedDrag()
      .onUpdate((e) => {
        const { x, y } = colorSelectorRef.getBoundingClientRect()
        const mouseOffsetX = e.pageX - x - window.scrollX
        const mouseOffseY = e.pageY - y - window.scrollY
        setSliderPosition({
          x: mouseOffsetX - sliderCenter.x,
          y: mouseOffseY - sliderCenter.y,
        })
        setColor((c) =>
          c
            .saturationv(xTransformSaturation(mouseOffsetX, props.size.width) * 100)
            .value(yTransformValue(mouseOffseY, props.size.height) * 100)
        )
        emitChange()
      })
      .action()
  }

  return (
    <div
      ref={setColorSelectorRef}
      style={backgroundStyles()}
      class={styles.colorSlider}
      onMouseDown={onSelectColor}
    >
      <GDraggable
        minX={sliderBoundary().minX}
        minY={sliderBoundary().minY}
        maxX={sliderBoundary().maxX}
        maxY={sliderBoundary().maxY}
        x={sliderPosition().x}
        y={sliderPosition().y}
        change={onDraggableChange}
      >
        <div class={styles.slider} style={sliderStyles()}></div>
      </GDraggable>
    </div>
  )
}

//x坐标转换饱和度
function xTransformSaturation(x: number, width: number) {
  return x / width
}

//饱和度转换x坐标
function saturationTransformX(saturation: number, width: number) {
  return saturation * width
}

//y坐标转换明度
function yTransformValue(y: number, height: number) {
  return 1 - y / height
}

//明度转换y坐标
function valueTransformY(value: number, height: number) {
  return (1 - value) * height
}
