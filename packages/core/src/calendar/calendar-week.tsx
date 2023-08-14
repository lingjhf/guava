import dayjs from 'dayjs'
import { GWeekContainer } from '../month'
import styles from './calendar-week.module.css'

export const CalendarWeek = () => {

  return (
    <div>
      <GWeekContainer
        renderWeekDay={
          (weekDay) => (
            <div class={styles.calendarWeekHeaderItem}>{weekDay.format('DD ddd')}</div>
          )
        }
        renderHour={(hour) => hour + 1 < 24 ? dayjs().set('hour', hour + 1).format('HH:00') : ''}
      />
    </div>
  )
}