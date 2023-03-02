import { createEffect, createSignal, mergeProps } from 'solid-js'
import { customElement } from 'solid-element'
import Color from 'color'
import '../color-slider'
import '../color-hue-slider'
import '../color-alpha-slider'
import styles from './styles.css?inline'

export interface GColorPickerProps {
  color: string
  change?: (color: Color) => void
}

customElement<Partial<GColorPickerProps>>(
  'g-color-picker',
  { color: undefined, change: undefined },
  (props) => {
    return (
      <>
        <style>{styles}</style>
        <GColorPicker color={props.color} change={props.change}></GColorPicker>
      </>
    )
  }
)

const GColorPicker = (props: Partial<GColorPickerProps>) => {
  const defaultProps = mergeProps<[GColorPickerProps, ...Partial<GColorPickerProps>[]]>(
    { color: '#fff' },
    props
  )
  const [color, setColor] = createSignal(Color().hsv())

  const railSize = { width: 200, height: 12 }
  createEffect(() => {
    setColor(Color(defaultProps.color).hsv())
  })

  function emitChange() {
    defaultProps.change?.(color())
  }

  function onSVChange(value: Color) {
    setColor(value)
    emitChange()
  }
  function onHueChange(value: Color) {
    setColor(value)
    emitChange()
  }
  function onAlphaChange(value: Color) {
    setColor(value)
    emitChange()
  }
  return (
    <div class="color-picker">
      <g-color-slider color={color()} change={onSVChange}></g-color-slider>
      <div class="color-picker-sliders-wrap">
        <div class="color-picker-slider-item-wrap">
          <g-color-hue-slider
            size={railSize}
            color={color()}
            change={onHueChange}
          ></g-color-hue-slider>
        </div>
        <div class="color-picker-slider-item-wrap">
          <g-color-alpha-slider
            size={railSize}
            color={color()}
            change={onAlphaChange}
          ></g-color-alpha-slider>
        </div>
      </div>
    </div>
  )
}

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'g-color-picker': Partial<GColorPickerProps>
    }
  }
}
