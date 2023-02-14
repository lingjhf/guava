import Color from 'color'
import { Position, Size } from '@lingjhf/utils'
import { createEffect, createSignal, mergeProps } from 'solid-js'
import { xTransformHue, hueTransformX } from './utils'
import { GRail } from './Rail'

interface Props {
  vertical: boolean
  color: Color
  size: Size
  sliderSize: Size
  onChange?: (color: Color) => void
}

export const GHubSelector = (props: Partial<Props>) => {
  const defaultProps = mergeProps<[Props, ...Partial<Props>[]]>(
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
    <GRail
      class="g-hue-selector"
      vertical={props.vertical}
      size={defaultProps.size}
      sliderSize={defaultProps.sliderSize}
      sliderPosition={sliderPosition()}
      onChange={onRailChange}
    ></GRail>
  )
}
