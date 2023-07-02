import { createEffect, createSignal, For, on, Show } from 'solid-js'
import type { GuavaProps } from '../types'
import { mergeClasses, generateSplitEventHandlersProps, mergeClassList, mergeStyles } from '../utils'
import { GScrollbar, type ScrollDetail } from '../scrollbar'
import styles from './time-picker-panel.module.css'

export interface TimePickerPanelProps extends GuavaProps<HTMLDivElement> {
  HH: boolean
  MM: boolean
  SS: boolean
  change?: () => void
}

export const TimePickerPanel = (propsRaw: Partial<TimePickerPanelProps>) => {
  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {
      HH: true,
      MM: true,
      SS: true
    },
  )
  const hours = Array.from({ length: 24 }, (_, k) => k)
  const minutes = Array.from({ length: 60 }, (_, k) => k)
  const seconds = Array.from({ length: 60 }, (_, k) => k)
  const [hourScrollY, setHourScrollY] = createSignal(0)
  const [minuteScrollY, setMinuteScrollY] = createSignal(0)
  const [secondScrollY, setSecondScrollY] = createSignal(0)
  const [hourScrollingY, setHourScrollingY] = createSignal(0)
  const [minuteScrollingY, setMinuteScrollingY] = createSignal(0)
  const [secondScrollingY, setSecondScrollingY] = createSignal(0)
  const [currentHour, setCurrentHour] = createSignal(0)
  const [currentMinute, setCurrentMinute] = createSignal(0)
  const [currentSecond, setCurrentSecond] = createSignal(0)

  createEffect(on(hourScrollingY, (value) => {
    setTimeout(() => {
      if (value === hourScrollingY()) {
        setHourScrollY(currentHour() * 32)
      }
    }, 300)
  }))

  createEffect(on(minuteScrollingY, (value) => {
    setTimeout(() => {
      if (value === minuteScrollingY()) {
        setMinuteScrollY(currentMinute() * 32)
      }
    }, 300)
  }))

  createEffect(on(secondScrollingY, (value) => {
    setTimeout(() => {
      if (value === secondScrollingY()) {
        setSecondScrollY(currentSecond() * 32)
      }
    }, 300)
  }))

  const hourItemClasses = (item: number) => {
    const classes = [styles.timePickerPanelItem]
    if (item === currentHour()) {
      classes.push(styles.timePickerPanelSelected)
    }
    return classes
  }

  const minuteItemClasses = (item: number) => {
    const classes = [styles.timePickerPanelItem]
    if (item === currentMinute()) {
      classes.push(styles.timePickerPanelSelected)
    }
    return classes
  }

  const secondItemClasses = (item: number) => {
    const classes = [styles.timePickerPanelItem]
    if (item === currentSecond()) {
      classes.push(styles.timePickerPanelSelected)
    }
    return classes
  }

  function fill(value: number) {
    if (value < 10) {
      return `0${value}`
    }
    return `${value}`
  }

  function hourSelected(value: number) {
    if (value !== currentHour()) {
      setHourScrollY(value * 32)
      setCurrentHour(value)
    }
  }

  function minuteSelected(value: number) {
    if (value !== currentMinute()) {
      setMinuteScrollY(value * 32)
      setCurrentMinute(value)
    }
  }

  function secondSelected(value: number) {
    if (value !== currentSecond()) {
      setSecondScrollY(value * 32)
      setCurrentSecond(value)
    }
  }

  function hourScrollChange(detail: ScrollDetail) {
    const value = Math.round(detail.scrollY / 32)
    setHourScrollingY(detail.scrollY)
    if (value !== currentHour()) {
      setCurrentHour(value)
    }
  }

  function minuteScrollChange(detail: ScrollDetail) {
    const value = Math.round(detail.scrollY / 32)
    setMinuteScrollingY(detail.scrollY)
    if (value !== currentMinute()) {
      setCurrentMinute(value)
    }
  }

  function secondScrollChange(detail: ScrollDetail) {
    const value = Math.round(detail.scrollY / 32)
    setSecondScrollingY(detail.scrollY)
    if (value !== currentSecond()) {
      setCurrentSecond(value)
    }
  }

  return (
    <div
      ref={props.ref}
      style={mergeStyles([], props.style)}
      class={mergeClasses([styles.timePickerPanel], props.class)}
      classList={mergeClassList({}, props.classList)}
      {...eventHandlers}
    >
      <div class={styles.timePickerPanelSelectedBorder}></div>
      <Show when={props.HH}>
        <GScrollbar scrollY={hourScrollY()} scrollChange={hourScrollChange}>
          <div class={styles.timePickerPanelColumn}>
            <For each={hours}>
              {
                (item) => {
                  return <div class={mergeClasses(hourItemClasses(item))} onClick={[hourSelected, item]}>{fill(item)}</div>
                }
              }
            </For>
          </div>
        </GScrollbar>
      </Show>
      <Show when={props.MM}>
        <GScrollbar scrollY={minuteScrollY()} scrollChange={minuteScrollChange}>
          <div class={styles.timePickerPanelColumn}>
            <For each={minutes}>
              {
                (item) => {
                  return <div class={mergeClasses(minuteItemClasses(item))} onClick={[minuteSelected, item]}>{fill(item)}</div>
                }
              }
            </For>
          </div>
        </GScrollbar>
      </Show>
      <Show when={props.SS}>
        <GScrollbar scrollY={secondScrollY()} scrollChange={secondScrollChange}>
          <div class={styles.timePickerPanelColumn}>
            <For each={seconds}>
              {
                (item) => {
                  return <div class={mergeClasses(secondItemClasses(item))} onClick={[secondSelected, item]}>{fill(item)}</div>
                }
              }
            </For>
          </div>
        </GScrollbar >
      </Show>
    </div >
  )
}

