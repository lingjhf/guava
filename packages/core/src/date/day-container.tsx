import type { GuavaProps } from '../types'
import { HourLine } from './hour-line'
import { For, createMemo, type JSX } from 'solid-js'
import styles from './day-container.module.css'
import { generateSplitEventHandlersProps } from '../utils'

export interface DayContainerProps extends GuavaProps<HTMLDivElement> {
  renderHour?: (hour: number) => JSX.Element
  renderRow?: (hour: number) => JSX.Element
}

export const DayContainer = (propsRaw: Partial<DayContainerProps>) => {
  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {}
  )

  return (
    <HourLine
      renderHour={(hour) => props.renderHour?.(hour)}
      renderRow={(hour) => props.renderRow?.(hour)}
    />
  )
}