import { GMonthView, GWeekHeader } from '../date'
import styles from './calendar-month.module.css'
import dayjs from 'dayjs'
import { Week, isWeekend } from '../date'
import { mergeClasses } from '../utils'
import { createSignal } from 'solid-js'
import { DateSwitch } from './date-switch'

const weekDayTextMap: Record<Week, string> = {
  0: 'SUN',
  1: 'MON',
  2: 'TUE',
  3: 'WED',
  4: 'THU',
  5: 'FRI',
  6: 'SAT'
}

export const CalendarMonth = () => {

  const [currentDate, setCurrentDate] = createSignal(dayjs())

  const dateClasses = (date: dayjs.Dayjs) => {
    const classes = [styles.calendarMonthDate]
    if (isWeekend(date)) {
      classes.push(styles.calendarMonthWeekend)
    }
    return mergeClasses(classes)
  }

  const dateTextClasses = (date: dayjs.Dayjs) => {
    const classes = [styles.calendarMonthDateHeaderText]
    if (date === currentDate()) {
      classes.push(styles.calendarMonthDateHeaderTodayText)
    } else if (date.month() === currentDate().month() && isWeekend(date)) {
      classes.push(styles.calendarMonthHeaderWeekendText)
    } else if (date.month() === currentDate().month()) {
      classes.push(styles.calendarMonthHeaderCurrentMonthText)
    } else {
      classes.push(styles.calendarMonthHeaderDefaultText)
    }
    return mergeClasses(classes)
  }

  function prevMonth() {
    setCurrentDate(v => v.subtract(1, 'month'))
  }

  function nextMonth() {

    setCurrentDate(v => v.add(1, 'month'))
  }

  function today() {
    setCurrentDate(dayjs())
  }

  return (
    <div class={styles.calendarMonth}>
      <div>
        <DateSwitch prev={prevMonth} next={nextMonth} today={today}>{currentDate().format('MM YYYY')}</DateSwitch>
      </div>
      <div class={styles.calendarMonthWeekHeader}>
        <GWeekHeader firstWeekDay={Week.Monday} renderWeekDay={
          (week) => (
            <div class={styles.calendarMonthWeekHeaderItem}>
              {weekDayTextMap[week]}
            </div>
          )
        } />
      </div>
      <GMonthView currentDate={currentDate()} firstWeekDay={Week.Monday} renderDate={
        (date) => (
          <div class={dateClasses(date)}>
            <div class={styles.calendarMonthDateHeader}>
              <div class={dateTextClasses(date)}>
                {date.date()}
              </div>
            </div>
          </div>
        )
      } />
    </div >
  )
}