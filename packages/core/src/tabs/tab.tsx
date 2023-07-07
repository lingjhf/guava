import { Show, createSignal } from 'solid-js'
import type { GuavaParentProps } from '../types'
import { generateSplitEventHandlersProps } from '../utils'
import styles from './tab.module.css'
import { useTabsContext } from './tabs'

export type TabValue = string | number

export interface TabProps extends GuavaParentProps<HTMLDivElement> {
  value?: TabValue
}

export const Tab = (propsRaw: Partial<TabProps>) => {
  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {}
  )
  const tabsContext = useTabsContext()
  if (!tabsContext) {
    throw Error('tabs context is undefined')
  }

  const [active, setActive] = createSignal(false)
  const itemKey = tabsContext.addItem({ item: active, setItem: setActive }, props.value)

  function clickActive() {
    tabsContext?.activeItem(itemKey)
  }

  return (
    <div class={styles.tab} onClick={clickActive}>
      {props.children}
      <Show when={active()}>
        <div class={styles.tabSlider}></div>
      </Show>
    </div>
  )
}