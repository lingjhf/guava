import dayjs from 'dayjs'
import { generateDays, Week } from './utils'
import { generateSplitEventHandlersProps } from '../utils'
import { For, type JSX } from 'solid-js'
import type { GuavaProps } from '../types'
import styles from './month-view.module.css'

export interface MonthViewProps extends GuavaProps<HTMLDivElement> {
  firstWeekDay: Week
  currentDate: dayjs.Dayjs
  renderDate?: (day: dayjs.Dayjs) => JSX.Element
}

export const MonthView = (propsRaw: Partial<MonthViewProps>) => {

  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {
      firstWeekDay: Week.Sunday, currentDate: dayjs()
    }
  )

  const dateRows = () => {
    const days = generateDays(props.currentDate, props.firstWeekDay)
    const rows: dayjs.Dayjs[][] = []
    let row: dayjs.Dayjs[] = []
    for (let i = 0; i < days.length; i++) {
      row.push(days[i])
      if ((i + 1) % 7 === 0) {
        rows.push(row)
        row = []
      }
    }
    return rows
  }
  return (
    <div>
      <For each={dateRows()}>
        {
          (row) => (
            <div class={styles.monthViewRow}>
              <For each={row}>
                {
                  (day) => (
                    props.renderDate?.(day)
                  )
                }
              </For>
            </div>
          )
        }
      </For>
    </div>
  )
}