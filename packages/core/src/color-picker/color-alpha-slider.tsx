import type { Size, Position, GuavaProps } from '../types'
import { createEffect, createSignal } from 'solid-js'
import Color from 'color'
import { generateSplitEventHandlersProps } from '../utils'
import { GRail } from '../rail'
import styles from './color-alpha-slider.module.css'

export interface ColorAlphaSliderProps extends GuavaProps<HTMLDivElement> {
  vertical: boolean
  color: Color
  size: Size
  sliderSize: Size
  change?: (color: Color) => void
}

export const ColorAlphaSlider = (propsRaw: Partial<ColorAlphaSliderProps>) => {

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
          y: alphaTransformX(
            props.color.alpha(),
            props.size.height - props.sliderSize.height / 2
          ),
        }
        : {
          x: alphaTransformX(
            props.color.alpha(),
            props.size.width - props.sliderSize.width
          ),
          y: 0,
        }
    )
    setColor(props.color)
  })
  const alphaStyles = () =>
    `background: linear-gradient(to right, ${color().alpha(0).hexa()} 0%, 
    ${color().alpha(1).hexa()} 100%);`

  function onRailChange(value: Position) {
    setColor((c) =>
      props.vertical
        ? c.alpha(
          xTransformAlpha(value.y, props.size.height - props.sliderSize.height)
        )
        : c.alpha(xTransformAlpha(value.x, props.size.width - props.sliderSize.width))
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
      <div class={styles.colorAlphaSlider} style={alphaStyles()}></div>
    </GRail>
  )
}

//alpha转换x坐标
function alphaTransformX(alpha: number, width: number) {
  return alpha * width
}

//x坐标转换alpha
function xTransformAlpha(x: number, width: number) {
  return x / width
}
