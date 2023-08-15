import dayjs from 'dayjs'
import { GWeekContainer, isWeekend } from '../date'
import { mergeClasses } from '../utils'
import styles from './calendar-week.module.css'

export const CalendarWeek = () => {

  const cellClasses = (weekDay: dayjs.Dayjs) => {
    const classes = [styles.calendarWeekCell]
    if (isWeekend(weekDay)) {
      classes.push(styles.calendarWeekWeekendCell)
    }
    return mergeClasses(classes)
  }

  return (
    <div>
      <GWeekContainer
        renderWeekDay={
          (weekDay) => (
            <div class={styles.calendarWeekHeaderItem}>{weekDay.format('DD ddd')}</div>
          )
        }
        renderHour={(hour) => hour + 1 < 24 ? dayjs().set('hour', hour + 1).format('HH:00') : ''}
        renderWeekDayHour={(weekDay) => <div class={cellClasses(weekDay)}></div>}
      />
    </div>
  )
}