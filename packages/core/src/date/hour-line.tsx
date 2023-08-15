import { For, onCleanup, type JSX, type JSXElement, createSignal } from 'solid-js'
import type { GuavaProps } from '../types'
import { generateSplitEventHandlersProps } from '../utils'
import styles from './hour-line.module.css'
import dayjs from 'dayjs'

export interface HourLineProps extends GuavaProps<HTMLDivElement> {
  header?: JSX.Element
  renderHour?: (hour: number) => JSX.Element
  renderRow?: (hour: number) => JSXElement
}

export const HourLine = (propsRaw: Partial<HourLineProps>) => {
  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {}
  )
  const totalHeight = 24 * 68
  const totalMinute = 24 * 60
  const minutePercentage = totalMinute / totalHeight
  const hours = Array.from({ length: 24 }, (_, k) => k)
  const [currentTimeTop, setCurrentTimeTop] = createSignal(0)

  const intervalId = setInterval(() => {
    const currentTime = dayjs()
    const top = (currentTime.hour() * 60 + currentTime.minute()) * minutePercentage
    if (top !== currentTimeTop()) {
      setCurrentTimeTop(top)
    }
  }, 1000)

  onCleanup(() => {
    clearInterval(intervalId)
  })

  return (
    <div class={styles.hourLine}>
      <div class={styles.hourLineCurrentTime} style={`top:${currentTimeTop()}px`}></div>
      <For each={hours}>
        {
          (hour) => (
            <div class={styles.hourLineRow}>
              <div class={styles.hourLineTimeWrap}>
                <div class={styles.hourLineTime}>
                  {props.renderHour?.(hour)}
                </div>
              </div>
              {props.renderRow?.(hour)}
            </div>
          )
        }
      </For>
    </div>
  )
}