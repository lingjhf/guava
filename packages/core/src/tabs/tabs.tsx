import { createContext, type Accessor, type Setter, useContext } from 'solid-js'
import type { GuavaParentProps } from '../types'
import { generateSplitEventHandlersProps } from '../utils'
import type { TabValue } from './tab'
import styles from './tabs.module.css'

interface ItemMapValue {
  item: Accessor<boolean>
  setItem: Setter<boolean>
}

export interface TabsProps extends GuavaParentProps<HTMLDivElement> {
  value?: TabValue
}

export interface TabsProviderValue {
  addItem: (item: ItemMapValue, key?: TabValue) => TabValue
  removeItem: (key: TabValue) => void
  activeItem: (key: TabValue) => void
}

export interface CollapseProps extends GuavaParentProps<HTMLDivElement> {
  accordion: boolean
  values: TabValue
}

export const TabsContext = createContext<TabsProviderValue>()
export const useTabsContext = () => useContext(TabsContext)

export const Tabs = (propsRaw: Partial<TabsProps>) => {
  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {}
  )

  let index = 0
  const items = new Map<TabValue, ItemMapValue>()

  function addItem(item: ItemMapValue, key?: TabValue) {
    items.set(key ?? index, item)
    return key ?? index++
  }

  function removeItem(itemKey: TabValue) {
    items.delete(itemKey)
  }

  function activeItem(itemKey: TabValue) {
    for (const [key, value] of items.entries()) {
      if (key === itemKey && !value.item()) {
        value.setItem(true)
      } else if (key !== itemKey && value.item()) {
        value.setItem(false)
      }
    }
  }

  const providerValue = {
    addItem,
    removeItem,
    activeItem
  }

  return (
    <TabsContext.Provider value={providerValue}>
      <div class={styles.tabs}>
        <div></div>
        <div class={styles.tabsContent}>
          {props.children}
        </div>
        <div></div>
      </div>
    </TabsContext.Provider>
  )
}