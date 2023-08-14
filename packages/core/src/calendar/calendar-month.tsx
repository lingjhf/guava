import dayjs from 'dayjs'
import { GMonthContainer, Week, isWeekend } from '../month'
import { mergeClasses } from '../utils'
import { createSignal } from 'solid-js'
import { DateSwitch } from './date-switch'
import styles from './calendar-month.module.css'

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
        <DateSwitch prev={prevMonth} next={nextMonth} today={today}>{currentDate().format('MMM YYYY')}</DateSwitch>
      </div>
      <GMonthContainer
        currentDate={currentDate()}
        firstWeekDay={Week.Monday}
        renderWeekDay={
          (week) => (
            <div class={styles.calendarMonthWeekHeaderItem}>
              {week.format('ddd')}
            </div>
          )
        }
        renderDate={
          (date) => (
            <div class={dateClasses(date)}>
              <div class={styles.calendarMonthDateHeader}>
                <div class={dateTextClasses(date)}>
                  {date.date()}
                </div>
              </div>
            </div>
          )
        }
      />
    </div >
  )
}