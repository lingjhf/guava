import { JSX } from 'solid-js/jsx-runtime'
import { generateSplitEventHandlersProps } from '../utils'
import styles from './slider.module.css'

export type SliderSize = 'default' | 'small' | 'large'
export interface SliderProps {
  min: number
  max: number
  step: number
  size: SliderSize
  range: boolean
  vertical: boolean
  disabled: boolean
  slider?: () => JSX.Element
}
export const Slider = (propsRaw: Partial<SliderProps>) => {
  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {
      min: 0,
      max: 100,
      step: 1,
      size: 'default',
      range: false,
      vertical: false,
      disabled: false
    },
  )

  return (
    <div class={styles.slider}>
      <div class={styles.sliderProgress}></div>
      <div class={styles.sliderCursor}></div>
    </div>
  )
}