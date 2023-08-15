import { generateDays, Week } from './../date'
import { generateSplitEventHandlersProps } from '../utils'
import dayjs from 'dayjs'
import type { GuavaProps } from '../types'
import { CalendarMonth } from './calendar-month'
import { CalendarWeek } from './calendar-week'
import styles from './calendar.module.css'
import { createEffect, createSignal, Match, Switch } from 'solid-js'
import { DateSwitch } from './date-switch'

export type CalendarType = 'month' | 'week' | 'day'

export interface CalendarProps extends GuavaProps<HTMLDivElement> {
  firstWeekDay: Week
  day: dayjs.Dayjs
  type: CalendarType
}

export const Calendar = (propsRaw: Partial<CalendarProps>) => {

  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {
      firstWeekDay: Week.Sunday, day: dayjs(),
      type: 'month',
    }
  )

  const [currentDate, setCurrentDate] = createSignal(dayjs())
  const [type, setType] = createSignal<CalendarType>(props.type)

  createEffect(
    () => props.type,
    () => {
      setType(props.type)
    }
  )

  function today() {
    setCurrentDate(dayjs())
  }

  function prevMonth() {
    setCurrentDate(v => v.subtract(1, 'month'))
  }

  function nextMonth() {
    setCurrentDate(v => v.add(1, 'month'))
  }

  function prevWeek() {

  }

  function nextWeek() {

  }



  return (
    <div class={styles.calendar}>
      <DateSwitch prev={prevMonth} next={nextMonth} today={today}>{currentDate().format('MMM YYYY')}</DateSwitch>
      <Switch >
        <Match when={props.type === 'month'}>
          <CalendarMonth currentDate={currentDate()}></CalendarMonth>
        </Match>
        <Match when={props.type === 'week'}>
          <CalendarWeek></CalendarWeek>
        </Match>
      </Switch>
    </div>
  )
}