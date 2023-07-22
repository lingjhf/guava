import { createEffect, createSignal } from 'solid-js'
import Color from 'color'
import { ColorSlider } from './color-slider'
import { ColorHueSlider } from './color-hue-slider'
import { ColorAlphaSlider } from './color-alpha-slider'
import styles from './color-picker.module.css'
import { generateSplitEventHandlersProps } from '../utils'
import type { GuavaProps } from '../types'

export interface ColorPickerProps extends GuavaProps<HTMLDivElement> {
  color: string
  change?: (color: Color) => void
}

export const ColorPicker = (propsRaw: Partial<ColorPickerProps>) => {
  const [eventHandlers, props] = generateSplitEventHandlersProps(propsRaw, {
    color: '#fff'
  })

  const [color, setColor] = createSignal(Color().hsv())
  const railSize = { width: 200, height: 12 }

  createEffect(() => {
    setColor(Color(props.color).hsv())
  })

  function emitChange() {
    props.change?.(color())
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
    <div class={styles.colorPicker}>
      <ColorSlider color={color()} change={onSVChange}></ColorSlider>
      <div class={styles.colorPickerSlidersWrap}>
        <div class={styles.colorPickerSliderItemWrap} >
          <ColorHueSlider
            size={railSize}
            color={color()}
            change={onHueChange}
          ></ColorHueSlider>
        </div>
        <div class={styles.colorPickerSliderItemWrap} >
          <ColorAlphaSlider
            size={railSize}
            color={color()}
            change={onAlphaChange}
          ></ColorAlphaSlider>
        </div>
      </div>
    </div>
  )
}