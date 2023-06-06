import type { Size, Position } from '../utils/types'
import { createEffect, createSignal, mergeProps } from 'solid-js'
import { customElement } from 'solid-element'
import Color from 'color'
import '../rail'
import styles from './styles.css?inline'

export interface GColorAlphaSliderProps {
  vertical: boolean
  color: Color
  size: Size
  sliderSize: Size
  change?: (color: Color) => void
}

customElement<Partial<GColorAlphaSliderProps>>(
  'g-color-alpha-slider',
  { vertical: false, color: undefined, size: undefined, sliderSize: undefined },
  (props) => {
    return (
      <>
        <style>{styles}</style>
        <GColorAlphaSlider
          vertical={props.vertical}
          color={props.color}
          size={props.size}
          sliderSize={props.sliderSize}
          change={props.change}
        ></GColorAlphaSlider>
      </>
    )
  }
)

const GColorAlphaSlider = (props: Partial<GColorAlphaSliderProps>) => {
  const defaultProps = mergeProps<[GColorAlphaSliderProps, ...Partial<GColorAlphaSliderProps>[]]>(
    {
      color: Color().hsv(),
      vertical: false,
      size: { width: 168, height: 12 },
      sliderSize: { width: 12, height: 12 },
    },
    props
  )
  const [color, setColor] = createSignal(Color())
  const [sliderPosition, setSliderPosition] = createSignal({ x: 0, y: 0 })

  createEffect(() => {
    //根据颜色设置滑块位置
    setSliderPosition(
      defaultProps.vertical
        ? {
          x: 0,
          y: alphaTransformX(
            defaultProps.color.alpha(),
            defaultProps.size.height - defaultProps.sliderSize.height / 2
          ),
        }
        : {
          x: alphaTransformX(
            defaultProps.color.alpha(),
            defaultProps.size.width - defaultProps.sliderSize.width
          ),
          y: 0,
        }
    )
    setColor(defaultProps.color)
  })
  const styles = () =>
    `background: linear-gradient(to right, ${color().alpha(0).hexa()} 0%, 
    ${color().alpha(1).hexa()} 100%);`

  function onRailChange(value: Position) {
    setColor((c) =>
      defaultProps.vertical
        ? c.alpha(
          xTransformAlpha(value.y, defaultProps.size.height - defaultProps.sliderSize.height)
        )
        : c.alpha(xTransformAlpha(value.x, defaultProps.size.width - defaultProps.sliderSize.width))
    )
    setSliderPosition(value)
    defaultProps.change?.(color())
  }

  return (
    <g-rail
      vertical={props.vertical}
      size={defaultProps.size}
      sliderSize={defaultProps.sliderSize}
      sliderPosition={sliderPosition()}
      change={onRailChange}
    >
      <div class='color-alpha-slider' style={styles()}></div>
    </g-rail>
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

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'g-color-alpha-slider': Partial<GColorAlphaSliderProps>
    }
  }
}
