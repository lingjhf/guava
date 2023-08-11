import { For, type JSX } from 'solid-js'
import { Week, generateWeekDays } from './utils'
import type { GuavaProps } from '../types'
import { generateSplitEventHandlersProps } from '../utils'
import styles from './week-header.module.css'

export interface WeekHeaderProps extends GuavaProps<HTMLDivElement> {
  firstWeekDay?: Week
  renderWeekDay?: (weekDay: Week) => JSX.Element
}

export const WeekHeader = (propsRaw: Partial<WeekHeaderProps>) => {
  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {}
  )
  return (
    <div class={styles.weekHeader}>
      <For each={generateWeekDays(props.firstWeekDay)}>
        {
          (week) => props.renderWeekDay?.(week)
        }
      </For>
    </div>
  )
}