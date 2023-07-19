import { createContext, type Accessor, type Setter, useContext, createEffect, on, createSignal, children } from 'solid-js'
import type { GuavaParentProps } from '../types'
import { generateSplitEventHandlersProps } from '../utils'
import type { BreadcrumbItemValue } from './breadcrumb-item'
import styles from './breadcrumb.module.css'
import breadcrumbItemStyles from './breadcrumb-item.module.css'

interface ItemMapValue {
  item: Accessor<boolean>
  setItem: Setter<boolean>
  showSeparator: Accessor<boolean>
  setShowSeparator: Setter<boolean>
}

export type BreadcrumbSize = 'default' | 'small' | 'large'

export interface BreadcrumbProviderValue {
  size: BreadcrumbSize
  addItem: (item: ItemMapValue, key?: BreadcrumbItemValue) => BreadcrumbItemValue
  removeItem: (key: BreadcrumbItemValue) => void
  activeItem: (key?: BreadcrumbItemValue) => void
}

export const BreadcrumbContext = createContext<BreadcrumbProviderValue>()
export const useBreadcrumbContext = () => useContext(BreadcrumbContext)

export interface BreadcrumbProps extends GuavaParentProps<HTMLDivElement> {
  value?: BreadcrumbItemValue
  size: BreadcrumbSize
}

export const Breadcrumb = (propsRaw: Partial<BreadcrumbProps>) => {
  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {
      size: 'default'
    }
  )

  let breadcrumbRef: HTMLDivElement
  let index = 0
  const items = new Map<BreadcrumbItemValue, ItemMapValue>()
  const [length, setLength] = createSignal(0)

  createEffect(on(() => props.value, () => {
    activeItem(props.value)
  }))

  function addItem(item: ItemMapValue, key?: BreadcrumbItemValue) {
    items.set(key ?? index, item)
    setLength(v => v + 1)
    return key ?? index++
  }

  function removeItem(itemKey: BreadcrumbItemValue) {
    setLength(v => v - 1)
    items.delete(itemKey)
  }

  function activeItem(itemKey?: BreadcrumbItemValue) {
    for (const [key, value] of items.entries()) {
      if (key === itemKey && !value.item()) {
        value.setItem(true)
      } else if (key !== itemKey && value.item()) {
        value.setItem(false)
      }
    }
  }

  const providerValue: BreadcrumbProviderValue = {
    size: props.size,
    addItem,
    removeItem,
    activeItem
  }
  return (
    <BreadcrumbContext.Provider value={providerValue}>
      <div class={styles.breadcrumb} ref={breadcrumbRef!}>
        {props.children}
      </div>
    </BreadcrumbContext.Provider>
  )
}