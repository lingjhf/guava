import type { Size, Position } from '../utils/types'
import { createEffect, createSignal, mergeProps } from 'solid-js'
import { customElement } from 'solid-element'
import Color from 'color'
import { createPressedDrag } from '../utils'
import '../draggable'
import styles from './styles.css?inline'

export interface GColorSliderProps {
  color: Color
  size: Size
  sliderSize: Size
  change?: (color: Color) => void
}

customElement<Partial<GColorSliderProps>>(
  'g-color-slider',
  { color: undefined, size: undefined, sliderSize: undefined, change: undefined },
  (props) => {
    return (
      <>
        <style>{styles}</style>
        <GColorSlider color={props.color} change={props.change}></GColorSlider>
      </>
    )
  }
)

const GColorSlider = (props: Partial<GColorSliderProps>) => {
  const defaultProps = mergeProps<[GColorSliderProps, ...Partial<GColorSliderProps>[]]>(
    {
      color: Color().hsv(),
      size: { width: 240, height: 240 },
      sliderSize: { width: 12, height: 12 },
    },
    props
  )
  let sliderCenter = {
    x: defaultProps.sliderSize.width / 2,
    y: defaultProps.sliderSize.height / 2,
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
        saturationTransformX(defaultProps.color.saturationv() / 100, defaultProps.size.width) -
        sliderCenter.x,
      y:
        valueTransformY(defaultProps.color.value() / 100, defaultProps.size.height) -
        sliderCenter.y,
    })
    setColor(defaultProps.color)
  })
  //监听滑块大小变化
  createEffect(() => {
    sliderCenter = { x: defaultProps.sliderSize.width / 2, y: defaultProps.sliderSize.height / 2 }
    //设置滑块边界
    setSliderBoundary({
      minX: 0 - sliderCenter.x,
      minY: 0 - sliderCenter.y,
      maxX: defaultProps.size.width - sliderCenter.x,
      maxY: defaultProps.size.height - sliderCenter.y,
    })
  })
  const styles = () => `
    width:${defaultProps.size.width}px;
    height:${defaultProps.size.height}px;
    background: linear-gradient(to right, #ffffff 0%, ${Color().hsv(color().hue(), 100, 100)} 100%)
  `

  const sliderStyles = () => `
    width: ${defaultProps.sliderSize.width}px;
    height: ${defaultProps.sliderSize.height}px;
  `
  let colorSelectorRef: HTMLElement
  function setColorSelectorRef(el: HTMLElement) {
    colorSelectorRef = el
  }

  function emitChange() {
    defaultProps.change?.(color())
  }

  //x位置换算成饱和度，y位置换算成明度
  function onDraggableChange(value: Position) {
    setColor((c) =>
      c
        .saturationv(xTransformSaturation(value.x + sliderCenter.x, defaultProps.size.width) * 100)
        .value(yTransformValue(value.y + sliderCenter.y, defaultProps.size.height) * 100)
    )
    emitChange()
  }

  //选择颜色
  function onSelectColor(e: MouseEvent) {
    const { x, y } = colorSelectorRef.getBoundingClientRect()
    const mouseOffsetX = e.pageX - x
    const mouseOffseY = e.pageY - y
    setSliderPosition({
      x: mouseOffsetX - sliderCenter.x,
      y: mouseOffseY - sliderCenter.y,
    })
    setColor((c) =>
      c
        .saturationv(xTransformSaturation(mouseOffsetX, defaultProps.size.width) * 100)
        .value(yTransformValue(mouseOffseY, defaultProps.size.height) * 100)
    )
    emitChange()
    createPressedDrag()
      .onUpdate((e) => {
        const { x, y } = colorSelectorRef.getBoundingClientRect()
        const mouseOffsetX = e.pageX - x
        const mouseOffseY = e.pageY - y
        setSliderPosition({
          x: mouseOffsetX - sliderCenter.x,
          y: mouseOffseY - sliderCenter.y,
        })
        setColor((c) =>
          c
            .saturationv(xTransformSaturation(mouseOffsetX, defaultProps.size.width) * 100)
            .value(yTransformValue(mouseOffseY, defaultProps.size.height) * 100)
        )
        emitChange()
      })
      .action()
  }

  return (
    <div
      ref={setColorSelectorRef}
      style={styles()}
      class="color-slider"
      onMouseDown={onSelectColor}
    >
      <g-draggable
        minX={sliderBoundary().minX}
        minY={sliderBoundary().minY}
        maxX={sliderBoundary().maxX}
        maxY={sliderBoundary().maxY}
        x={sliderPosition().x}
        y={sliderPosition().y}
        change={onDraggableChange}
      >
        <div class="slider" style={sliderStyles()}></div>
      </g-draggable>
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

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'g-color-slider': Partial<GColorSliderProps>
    }
  }
}
