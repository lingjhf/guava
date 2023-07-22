import type { Size, Position, GuavaProps } from '../types'
import { createEffect, createSignal } from 'solid-js'
import { generateSplitEventHandlersProps } from '../utils'
import Color from 'color'
import { GRail } from '../rail'
import styles from './color-hue-slider.module.css'

export interface ColorHueSliderProps extends GuavaProps<HTMLDivElement> {
  vertical: boolean
  color: Color
  size: Size
  sliderSize: Size
  change?: (color: Color) => void
}

export const ColorHueSlider = (propsRaw: Partial<ColorHueSliderProps>) => {

  const [eventHandlers, props] = generateSplitEventHandlersProps(propsRaw, {
    color: Color().hsv(),
    vertical: false,
    size: { width: 168, height: 12 },
    sliderSize: { width: 12, height: 12 },
  })

  const [color, setColor] = createSignal(Color())
  const [sliderPosition, setSliderPosition] = createSignal({ x: 0, y: 0 })

  createEffect(() => {
    //根据颜色设置滑块位置
    setSliderPosition(
      props.vertical
        ? {
          x: 0,
          y: hueTransformX(
            props.color.hue(),
            props.size.height - props.sliderSize.height
          ),
        }
        : {
          x: hueTransformX(
            props.color.hue(),
            props.size.width - props.sliderSize.width
          ),
          y: 0,
        }
    )
    setColor(props.color)
  })

  function onRailChange(value: Position) {
    setColor((c) =>
      props.vertical
        ? c.hue(xTransformHue(value.y, props.size.height - props.sliderSize.height))
        : c.hue(xTransformHue(value.x, props.size.width - props.sliderSize.width))
    )
    setSliderPosition(value)
    props.change?.(color())
  }

  return (
    <GRail
      vertical={props.vertical}
      size={props.size}
      sliderSize={props.sliderSize}
      sliderPosition={sliderPosition()}
      change={onRailChange}
    >
      <div class={styles.colorHueSlider}></div>
    </GRail>
  )
}

//hue转换x轴坐标
function hueTransformX(hue: number, width: number) {
  return (hue / 360) * width
}

//x坐标转换hue
function xTransformHue(x: number, width: number) {
  return (x / width) * 360
}
