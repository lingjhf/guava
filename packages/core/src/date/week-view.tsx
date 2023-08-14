import dayjs from 'dayjs'
import { For } from 'solid-js'
import { HourLine } from './hour-line'
import { GTabs, GTab } from '../tabs'
import { generateWeekDays, Week } from './utils'
import type { GuavaProps } from '../types'
import { generateSplitEventHandlersProps } from '../utils'
import styles from './week-view.module.css'

export interface WeekViewProps extends GuavaProps<HTMLDivElement> {
  firstWeekDay: Week
  currentDate: dayjs.Dayjs
}

export const WeekView = (propsRaw: Partial<WeekViewProps>) => {

  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {
      firstWeekDay: Week.Sunday, currentDate: dayjs()
    }
  )

  function generateWeekDays(currentDate: dayjs.Dayjs, firstWeekDay: Week = Week.Sunday): dayjs.Dayjs[] {
    const days: dayjs.Dayjs[] = []
    let day = currentDate
    while (true) {
      days.push(day)
      if (day.day() === firstWeekDay) {
        break
      }
      day = currentDate.subtract(1, 'day')
    }
    day = currentDate
    while (days.length < 7) {
      day = day.add(1, 'day')
      days.push(day)
    }
    return days
  }

  const weekDays = generateWeekDays(props.currentDate, props.firstWeekDay)
  return (
    <div>
      <GTabs>
        <For each={weekDays}>
          {
            (weekDay) => (
              <GTab value={weekDay.day()}>
                {/* <div class={styles.weekViewWeekDay}>{weekDay.format('DD ddd')}</div> */}
              </GTab>
            )
          }
        </For>
      </GTabs>
    </div>
  )
}