import { createContext, type Accessor, type Setter, useContext, createEffect, on } from 'solid-js'
import type { GuavaParentProps } from '../types'
import { generateSplitEventHandlersProps } from '../utils'
import styles from './collapse.module.css'

export type CollapseValue = string | number

interface ItemMapValue {
  item: Accessor<boolean>
  setItem: Setter<boolean>
}

export interface CollapseProviderValue {
  addItem: (item: ItemMapValue, key?: CollapseValue) => CollapseValue
  removeItem: (key: CollapseValue) => void
  activeItem: (key: CollapseValue) => void
}

export interface CollapseProps extends GuavaParentProps<HTMLDivElement> {
  accordion: boolean
  values: CollapseValue[]
}

export const CollapseContext = createContext<CollapseProviderValue>()
export const useCollapseContext = () => useContext(CollapseContext)

export const Collapse = (propsRaw: Partial<CollapseProps>) => {
  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {
      accordion: false,
      values: []
    }
  )
  let index = 0
  const items = new Map<CollapseValue, ItemMapValue>()

  createEffect(on(() => props.values, () => {
    for (const value of items.values()) {
      value.setItem(false)
    }
    for (const key of props.values) {
      items.get(key)?.setItem(true)
    }
  }))

  function addItem(item: ItemMapValue, key?: CollapseValue) {
    items.set(key ?? index, item)
    return key ?? index++
  }

  function removeItem(itemKey: CollapseValue) {
    items.delete(itemKey)
  }

  function activeItem(itemKey: CollapseValue) {
    if (props.accordion) {
      for (const [key, value] of items.entries()) {
        if (key === itemKey) {
          value.setItem(v => !v)
        } else if (key !== itemKey && value.item()) {
          value.setItem(false)
        }
      }
    } else {
      const value = items.get(itemKey)
      value?.setItem(v => !v)
    }
  }

  const providerValue = {
    addItem,
    removeItem,
    activeItem
  }

  return (
    <CollapseContext.Provider value={providerValue}>
      <div class={styles.collapse}>
        {props.children}
      </div>
    </CollapseContext.Provider>
  )
}