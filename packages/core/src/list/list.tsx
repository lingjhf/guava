import type { Accessor, Setter } from 'solid-js'
import { createContext, useContext, createSignal, createEffect, on } from 'solid-js'
import type { GuavaParentProps } from '../types'
import { generateSplitEventHandlersProps, mergeClasses, mergeStyles } from '../utils'
import styles from './list.module.css'

export type ListValue = string | number

interface ListProviderValue {
  nav: Accessor<boolean>
  addItem: (item: Accessor<boolean>, setItem: Setter<boolean>, key?: ListValue) => ListValue
  removeItem: (itemKey: ListValue) => void
  activeItem: (itemKey: ListValue) => void
}

export const ListContext = createContext<ListProviderValue>()
export const useListContext = () => useContext(ListContext)

export interface ListProps extends GuavaParentProps<HTMLDivElement> {
  value?: ListValue
  nav: boolean
}

export const List = (propsRaw: Partial<ListProps>) => {

  const [eventHandlers, props] = generateSplitEventHandlersProps(propsRaw, { nav: false })

  let index = 0
  const items = new Map<ListValue, { item: Accessor<boolean>, setItem: Setter<boolean> }>()
  const [nav, setNav] = createSignal(props.nav)

  const listClasses = () => {
    const classes = [styles.list]
    if (nav()) {
      classes.push(styles.listNav)
    }
    return mergeClasses(classes)
  }

  createEffect(() => {
    setNav(props.nav)
  })

  createEffect(on(() => props.value, () => {
    activeItem(props.value)
  }))

  function addItem(item: Accessor<boolean>, setItem: Setter<boolean>, key?: ListValue) {
    items.set(key ?? index, { item, setItem })
    return key ?? index++
  }

  function removeItem(itemKey: ListValue) {
    items.delete(itemKey)
  }

  function activeItem(itemKey?: ListValue) {
    let active: Setter<boolean> | undefined
    let inactive: Setter<boolean> | undefined
    for (const [key, { item, setItem }] of items.entries()) {
      if (key === itemKey && !item()) {
        active = setItem
      } else if (key !== itemKey && item()) {
        inactive = setItem
      }
    }
    inactive?.(false)
    active?.(true)
  }

  const providerValue = {
    nav,
    addItem,
    removeItem,
    activeItem
  }
  return (
    <ListContext.Provider value={providerValue}>
      <div class={listClasses()} style={mergeStyles({}, props.style)} {...eventHandlers}>
        {propsRaw.children}
      </div>
    </ListContext.Provider>
  )
}