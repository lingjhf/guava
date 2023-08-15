import dayjs from 'dayjs'
import { GWeekContainer, Week, isWeekend } from '../date'
import { generateSplitEventHandlersProps, mergeClasses } from '../utils'
import styles from './calendar-week.module.css'
import type { GuavaProps } from '../types'

export interface CalendarWeekProps extends GuavaProps<HTMLDivElement> {
  currentDate: dayjs.Dayjs
  firstWeekDay: Week
}


export const CalendarWeek = (propsRaw: Partial<CalendarWeekProps>) => {

  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {
      currentDate: dayjs(),
      firstWeekDay: Week.Sunday,
    }
  )


  const cellClasses = (weekDay: dayjs.Dayjs) => {
    const classes = [styles.calendarWeekCell]
    if (isWeekend(weekDay)) {
      classes.push(styles.calendarWeekWeekendCell)
    }
    if (weekDay.hour() < 23) {
      classes.push(styles.calendarWeekCellBorder)
    }
    return mergeClasses(classes)
  }

  return (
    <GWeekContainer
      currentDate={props.currentDate}
      firstWeekDay={props.firstWeekDay}
      renderWeekDay={
        (weekDay) => (
          <div class={styles.calendarWeekHeaderItem}>{weekDay.format('DD ddd')}</div>
        )
      }
      renderAllDay={<div class={styles.calendarWeekAllDay}></div>}
      renderHour={(hour) => hour + 1 < 24 ? dayjs().set('hour', hour + 1).format('HH:00') : ''}
      renderWeekDayHour={(weekDay) => <div class={cellClasses(weekDay)}></div>}
    />
  )
}