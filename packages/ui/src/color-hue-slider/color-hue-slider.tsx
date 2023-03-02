import { createEffect, createSignal, mergeProps } from 'solid-js'
import { customElement } from 'solid-element'
import Color from 'color'
import '../rail'
import styles from './styles.css?inline'

export interface GColorHueSliderProps {
  vertical: boolean
  color: Color
  size: Size
  sliderSize: Size
  onChange?: (color: Color) => void
}

customElement<Partial<GColorHueSliderProps>>(
  'g-color-hue-slider',
  { vertical: false, color: undefined, size: undefined, sliderSize: undefined },
  (props, { element }) => {
    const onChange = (color: Color) => {
      element.dispatchEvent(new CustomEvent('onChange', { detail: color }))
    }
    return (
      <>
        <style>{styles}</style>
        <GColorHueSlider
          vertical={props.vertical}
          color={props.color}
          size={props.size}
          sliderSize={props.sliderSize}
          onChange={onChange}
        ></GColorHueSlider>
      </>
    )
  }
)

const GColorHueSlider = (props: Partial<GColorHueSliderProps>) => {
  const defaultProps = mergeProps<[GColorHueSliderProps, ...Partial<GColorHueSliderProps>[]]>(
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
            y: hueTransformX(
              defaultProps.color.hue(),
              defaultProps.size.height - defaultProps.sliderSize.height
            ),
          }
        : {
            x: hueTransformX(
              defaultProps.color.hue(),
              defaultProps.size.width - defaultProps.sliderSize.width
            ),
            y: 0,
          }
    )
    setColor(defaultProps.color)
  })

  function onRailChange(value: Position) {
    setColor((c) =>
      defaultProps.vertical
        ? c.hue(xTransformHue(value.y, defaultProps.size.height - defaultProps.sliderSize.height))
        : c.hue(xTransformHue(value.x, defaultProps.size.width - defaultProps.sliderSize.width))
    )
    setSliderPosition(value)
    defaultProps.onChange?.(color())
  }

  return (
    <g-rail
      vertical={props.vertical}
      size={defaultProps.size}
      sliderSize={defaultProps.sliderSize}
      sliderPosition={sliderPosition()}
      change={onRailChange}
    >
      <div class="color-hue-slider"></div>
    </g-rail>
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

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'g-color-hue-slider': Partial<GColorHueSliderProps>
    }
  }
}
