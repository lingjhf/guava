import { generateWeekDays, Week } from '../date'
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
  currentDate: dayjs.Dayjs
  type: CalendarType
}

export interface DateRange {
  start: dayjs.Dayjs
  end: dayjs.Dayjs
}

export const Calendar = (propsRaw: Partial<CalendarProps>) => {

  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {
      firstWeekDay: Week.Sunday, currentDate: dayjs(),
      type: 'month',
    }
  )

  const [currentDate, setCurrentDate] = createSignal(dayjs())
  const [currentWeek, setCurrentWeek] = createSignal(getWeekRange(props.currentDate, props.firstWeekDay))
  const [type, setType] = createSignal<CalendarType>(props.type)

  createEffect(
    () => {
      setType(props.type)
      setCurrentDate(props.currentDate)
      if (props.type === 'week') {
        setCurrentWeek(getWeekRange(props.currentDate, props.firstWeekDay))
      }
    }
  )

  function getWeekRange(currentDate: dayjs.Dayjs, firstWeekDay?: Week): DateRange {
    const days = generateWeekDays(currentDate, firstWeekDay)
    return {
      start: days[0],
      end: days[days.length - 1]
    }
  }

  function today() {
    setCurrentDate(dayjs())
    setCurrentWeek(getWeekRange(currentDate(), props.firstWeekDay))
  }

  function prevMonth() {
    setCurrentDate(v => v.subtract(1, 'month'))
  }

  function nextMonth() {
    setCurrentDate(v => v.add(1, 'month'))
  }

  function prevWeek() {
    setCurrentDate(v => v.subtract(7, 'day'))
    setCurrentWeek(value => ({ start: value.start.subtract(7, 'day'), end: value.end.subtract(7, 'day') }))
  }

  function nextWeek() {
    setCurrentDate(v => v.add(7, 'day'))
    setCurrentWeek(value => ({ start: value.start.add(7, 'day'), end: value.end.add(7, 'day') }))
  }

  return (
    <div class={styles.calendar}>
      <Switch >
        <Match when={type() === 'month'}>
          <DateSwitch prev={prevMonth} next={nextMonth} today={today}>{currentDate().format('MMM YYYY')}</DateSwitch>
          <CalendarMonth firstWeekDay={props.firstWeekDay} currentDate={currentDate()}></CalendarMonth>
        </Match>
        <Match when={type() === 'week'}>
          <DateSwitch prev={prevWeek} next={nextWeek} today={today}>{`${currentWeek().start.format('YYYY MM-DD')} ${currentWeek().end.format('MM-DD')}`}</DateSwitch>
          <CalendarWeek firstWeekDay={props.firstWeekDay} currentDate={currentDate()}></CalendarWeek>
        </Match>
      </Switch>
    </div>
  )
}