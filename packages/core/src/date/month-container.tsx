import dayjs from 'dayjs'
import { generateSplitEventHandlersProps } from '../utils'
import { For, type JSX } from 'solid-js'
import type { GuavaProps } from '../types'
import { generateDays, generateWeekDays, Week } from './utils'
import styles from './month-container.module.css'

export interface MonthContainerProps extends GuavaProps<HTMLDivElement> {
  firstWeekDay: Week
  currentDate: dayjs.Dayjs
  renderWeekDay?: (day: dayjs.Dayjs) => JSX.Element
  renderDate?: (day: dayjs.Dayjs) => JSX.Element
}

export const MonthContainer = (propsRaw: Partial<MonthContainerProps>) => {

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
      <div class={styles.monthContainerHeader}>
        <For each={generateWeekDays(props.currentDate, props.firstWeekDay)}>
          {
            (day) => props.renderWeekDay?.(day)
          }
        </For>
      </div>
      <div>
        <For each={dateRows()}>
          {
            (row) => (
              <div class={styles.monthContainerRow}>
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
    </div>
  )
}