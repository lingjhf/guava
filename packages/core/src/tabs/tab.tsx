import { Show, createSignal, createEffect, on } from 'solid-js'
import type { GuavaParentProps } from '../types'
import { generateSplitEventHandlersProps, mergeClasses } from '../utils'
import { useTabsContext, type TabsSize } from './tabs'
import styles from './tab.module.css'

export type TabValue = string | number

export interface TabProps extends GuavaParentProps<HTMLDivElement> {
  value?: TabValue
}

const sizeClasses: Record<TabsSize, string> = {
  'default': styles.tabDefault,
  'small': styles.tabSmall,
  'large': styles.tabLarge
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

  const tabClasses = () => {
    const classes = [styles.tab, sizeClasses[tabsContext.size]]
    if (active()) {
      classes.push(styles.tabActive)
    }
    return mergeClasses(classes, props.class)
  }

  createEffect(on(() => props.value, () => {
    if (props.value !== undefined && props.value !== itemKey) {
      tabsContext.removeItem(itemKey)
      tabsContext.addItem({ item: active, setItem: setActive }, props.value)
    }
  }))

  function clickActive() {
    tabsContext?.activeItem(itemKey)
  }

  return (
    <div class={tabClasses()} onClick={clickActive}>
      {props.children}
      <Show when={active()}>
        <div class={styles.tabSlider}></div>
      </Show>
    </div>
  )
}