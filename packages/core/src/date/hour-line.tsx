import { For, type JSX, type JSXElement } from 'solid-js'
import type { GuavaProps } from '../types'
import { generateSplitEventHandlersProps } from '../utils'
import styles from './hour-line.module.css'

export interface HourLineProps extends GuavaProps<HTMLDivElement> {
  renderHour?: (hour: number) => JSX.Element
  renderRow?: () => JSXElement
}

export const HourLine = (propsRaw: Partial<HourLineProps>) => {
  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {}
  )

  const hours = Array.from({ length: 24 }, (_, k) => k)

  return (
    <div>
      <For each={hours}>
        {
          (hour) => (
            <div class={styles.hourLine}>
              <div class={styles.hourLineTimeWrap}>
                <div class={styles.hourLineTime}>
                  {props.renderHour?.(hour)}
                </div>
              </div>
              <div class={styles.hourLineRow}>
                {props.renderRow?.()}
              </div>
            </div>
          )
        }
      </For>
    </div>
  )
}