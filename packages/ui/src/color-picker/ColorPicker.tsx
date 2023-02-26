import Color from 'color'
import { GColorSelector } from './ColorSelector'
import { GAlphaSelector } from './AlphaSelector'
import { GHueSelector } from './HueSelector'
import { createEffect, createSignal, mergeProps } from 'solid-js'

export interface GColorPickerProps {
  color: string
  onChange?: (color: Color) => void
}

export const GColorPicker = (props: Partial<GColorPickerProps>) => {
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
    defaultProps.onChange?.(color())
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
    <div class="g-color-picker">
      <GColorSelector color={color()} onChange={onSVChange}></GColorSelector>
      <div class="p-2">
        <div class="flex h-7 items-center justify-center">
          <GHueSelector size={railSize} color={color()} onChange={onHueChange}></GHueSelector>
        </div>
        <div class="flex h-7 items-center justify-center">
          <GAlphaSelector size={railSize} color={color()} onChange={onAlphaChange}></GAlphaSelector>
        </div>
      </div>
    </div>
  )
}
