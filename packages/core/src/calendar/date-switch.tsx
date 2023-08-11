import type { JSX } from 'solid-js/jsx-runtime'
import { GButton } from '../button'
import { ChevronLeftFilled } from '../icon/chevron-left-filled'
import { ChevronRightFilled } from '../icon/chevron-right-filled'
import type { GuavaParentProps } from '../types'
import { generateSplitEventHandlersProps } from '../utils'
import { Show } from 'solid-js'
import styles from './date-switch.module.css'

export interface DateSwitchProps extends GuavaParentProps<HTMLDivElement> {
  renderPrev?: JSX.Element
  renderNext?: JSX.Element
  renderToday?: JSX.Element
  prev?: () => void
  next?: () => void
  today?: () => void
}

export const DateSwitch = (propsRaw: Partial<DateSwitchProps>) => {

  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {}
  )

  return (
    <div class={styles.dateSwitch}>
      <GButton variant='text' size='small' onClick={props.prev}>
        <Show when={props.renderPrev} fallback={<ChevronLeftFilled class={styles.dateSwitchIcon} />}>
          {props.renderPrev}
        </Show>
      </GButton>
      <div>
        {props.children}
      </div>
      <GButton variant='text' size='small' onClick={props.next}>
        <Show when={props.renderNext} fallback={<ChevronRightFilled class={styles.dateSwitchIcon} />}>
          {props.renderNext}
        </Show>
      </GButton>
      <GButton type='primary' variant='jelly' size='small'>
        <Show when={props.renderToday} fallback={'Today'}>
          {props.renderToday}
        </Show>
      </GButton>
    </div>
  )
}