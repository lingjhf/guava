import type { JSX } from 'solid-js'
import { For, createEffect, createSignal } from 'solid-js'
import type { GuavaProps, ValueChanged } from '../types'
import { generateSplitEventHandlersProps } from '../utils'
import { StarOutlined } from '../icon/star-outlined'
import styles from './rate.module.css'

export interface RateProps extends GuavaProps<HTMLDivElement> {
  value: number
  max: number
  voidIcon?: JSX.Element
  icons?: JSX.Element | ValueChanged<JSX.Element>
  colors?: string[] | ValueChanged<number>
}

export const Rate = (propsRaw: Partial<RateProps>) => {
  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {
      value: 0,
      max: 5
    }
  )
  const [rateItems, setRateItems] = createSignal<boolean[]>([])
  createEffect(() => {
    setRateItems(Array.from({ length: props.max }, () => false))
  })

  function rateClick() { }

  function rateHover() { }

  return (
    <div class={styles.rate}>
      <For each={rateItems()}>
        {
          (active, index) => {
            return (
              <StarOutlined class={styles.rateItem} onMouseEnter={rateHover} onClick={rateClick} />
            )
          }
        }
      </For>
    </div>
  )
}