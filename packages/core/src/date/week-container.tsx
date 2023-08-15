import dayjs from 'dayjs'
import { For, createMemo, type JSX } from 'solid-js'
import { HourLine } from './hour-line'
import { GTabs, GTab } from '../tabs'
import { generateWeekDays, Week } from './utils'
import type { GuavaProps } from '../types'
import { generateSplitEventHandlersProps } from '../utils'
import { GScrollbar } from '../scrollbar'
import styles from './week-container.module.css'

export interface WeekContainerProps extends GuavaProps<HTMLDivElement> {
  firstWeekDay: Week
  currentDate: dayjs.Dayjs
  renderWeekDay?: (day: dayjs.Dayjs) => JSX.Element
  renderAllDay?: JSX.Element
  renderHour?: (hour: number) => JSX.Element
  renderWeekDayHour?: (day: dayjs.Dayjs) => JSX.Element
}

export const WeekContainer = (propsRaw: Partial<WeekContainerProps>) => {

  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {
      firstWeekDay: Week.Sunday, currentDate: dayjs()
    }
  )
  const weekDays = createMemo(() => generateWeekDays(props.currentDate, props.firstWeekDay))
  return (
    <div class={styles.weekContainer}>
      <div class={styles.weekContainerHeader}>
        <div class={styles.weekContainerHeaderPlaceholder}></div>
        <GTabs value={props.currentDate.day()}>
          <For each={weekDays()}>
            {
              (weekDay) => (
                <GTab class={styles.weekContainerHeaderItem} value={weekDay.day()}>
                  {props.renderWeekDay?.(weekDay) ?? weekDay.format('DD ddd')}
                </GTab>
              )
            }
          </For>
        </GTabs>
      </div>
      {props.renderAllDay}
      <GScrollbar>
        <HourLine
          renderHour={(hour) => props.renderHour?.(hour)}
          renderRow={
            (hour) => (
              <div class={styles.weekContainerRow}>
                <For each={weekDays()}>
                  {
                    (weekDay) => props.renderWeekDayHour?.(weekDay.set('hour', hour))
                  }
                </For>
              </div>
            )
          }
        />
      </GScrollbar>
    </div>
  )
}