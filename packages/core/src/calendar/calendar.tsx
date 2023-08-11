import { generateDays, Week } from './../date'
import { generateSplitEventHandlersProps } from '../utils'
import dayjs from 'dayjs'
import type { GuavaProps } from '../types'
import { CalendarMonth } from './calendar-month'
import styles from './calendar.module.css'

export interface CalendarProps extends GuavaProps<HTMLDivElement> {
  firstWeekDay: Week
  day: dayjs.Dayjs
}

export const Calendar = (propsRaw: Partial<CalendarProps>) => {

  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {
      firstWeekDay: Week.Sunday, day: dayjs()
    }
  )

  const weekDays = () => {
    const days: Week[] = []
    let weekDay = props.firstWeekDay
    while (days.length < 7) {
      days.push(weekDay)
      weekDay += 1
      if (weekDay > Week.Saturday) {
        weekDay = Week.Sunday
      }
    }
    return days
  }
  return (
    <div class={styles.calendar}>
      <CalendarMonth></CalendarMonth>
    </div>
  )
}