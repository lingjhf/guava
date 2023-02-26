import Color from 'color'
import { Position, Size } from '../utils'
import { createEffect, createSignal, mergeProps } from 'solid-js'
import { xTransformAlpha, alphaTransformX } from './utils'
import { GRail } from './Rail'

export interface GAlphaSelectorProps {
  vertical: boolean
  color: Color
  size: Size
  sliderSize: Size
  onChange?: (color: Color) => void
}

export const GAlphaSelector = (props: Partial<GAlphaSelectorProps>) => {
  const defaultProps = mergeProps<[GAlphaSelectorProps, ...Partial<GAlphaSelectorProps>[]]>(
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
        : c.alpha(
            xTransformAlpha(value.x, defaultProps.size.width - defaultProps.sliderSize.width)
          )
    )
    setSliderPosition(value)
    defaultProps.onChange?.(color())
  }

  return (
    <GRail
      class="g-alpha-selector"
      vertical={props.vertical}
      size={defaultProps.size}
      sliderSize={defaultProps.sliderSize}
      sliderPosition={sliderPosition()}
      style={styles()}
      onChange={onRailChange}
    ></GRail>
  )
}
