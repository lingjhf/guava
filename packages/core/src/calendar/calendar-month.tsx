import dayjs from 'dayjs'
import { GMonthContainer, Week, isWeekend } from '../date'
import { generateSplitEventHandlersProps, mergeClasses } from '../utils'
import styles from './calendar-month.module.css'
import type { GuavaProps } from '../types'

export interface CalendarMonthProps extends GuavaProps<HTMLDivElement> {
  currentDate: dayjs.Dayjs
  firstWeekDay: Week
}

export const CalendarMonth = (propsRaw: Partial<CalendarMonthProps>) => {

  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {
      currentDate: dayjs(),
      firstWeekDay: Week.Sunday,
    }
  )

  const cellClasses = (date: dayjs.Dayjs) => {
    const classes = [styles.calendarMonthCell]
    if (isWeekend(date)) {
      classes.push(styles.calendarMonthWeekend)
    }
    return mergeClasses(classes)
  }

  const dateTextClasses = (date: dayjs.Dayjs) => {
    const classes = [styles.calendarMonthDateHeaderText]
    if (date === props.currentDate) {
      classes.push(styles.calendarMonthDateHeaderTodayText)
    } else if (date.month() === props.currentDate.month() && isWeekend(date)) {
      classes.push(styles.calendarMonthHeaderWeekendText)
    } else if (date.month() === props.currentDate.month()) {
      classes.push(styles.calendarMonthHeaderCurrentMonthText)
    } else {
      classes.push(styles.calendarMonthHeaderDefaultText)
    }
    return mergeClasses(classes)
  }

  return (
    <GMonthContainer
      currentDate={props.currentDate}
      firstWeekDay={props.firstWeekDay}
      renderWeekDay={
        (week) => (
          <div class={styles.calendarMonthWeekHeaderItem}>
            {week.format('ddd')}
          </div>
        )
      }
      renderDate={
        (date) => (
          <div class={cellClasses(date)}>
            <div class={styles.calendarMonthDateHeader}>
              <div class={dateTextClasses(date)}>
                {date.date()}
              </div>
            </div>
          </div>
        )
      }
    />
  )
}