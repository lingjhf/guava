import type { Accessor, Setter } from 'solid-js'
import { createContext, useContext, createSignal, createEffect, on } from 'solid-js'
import type { GuavaParentProps } from '../types'
import type { ListGroupProviderValue } from './list-group'
import { generateSplitEventHandlersProps, mergeClasses, mergeStyles } from '../utils'
import styles from './list.module.css'

export type ListValue = string | number

interface ListProviderValue {
  nav: Accessor<boolean>
  addItem: (item: ItemMapValue, key?: ListValue) => ListValue
  removeItem: (itemKey: ListValue) => void
  activeItem: (itemKey: ListValue) => void
}

export const ListContext = createContext<ListProviderValue>()
export const useListContext = () => useContext(ListContext)

export interface ListProps extends GuavaParentProps<HTMLDivElement> {
  value?: ListValue
  nav: boolean
}

interface ItemMapValue {
  item: Accessor<boolean>
  setItem: Setter<boolean>
  groupContext?: ListGroupProviderValue

}

export const List = (propsRaw: Partial<ListProps>) => {

  const [eventHandlers, props] = generateSplitEventHandlersProps(propsRaw, { nav: false })

  let index = 0
  const items = new Map<ListValue, ItemMapValue>()
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

  function addItem(item: ItemMapValue, key?: ListValue) {
    items.set(key ?? index, item)
    return key ?? index++
  }

  function removeItem(itemKey: ListValue) {
    items.delete(itemKey)
  }

  function activeItem(itemKey?: ListValue) {
    let active: ItemMapValue | undefined
    let inactive: ItemMapValue | undefined
    for (const [key, value] of items.entries()) {
      if (key === itemKey && !value.item()) {
        active = value
      } else if (key !== itemKey && value.item()) {
        inactive = value
      }
    }
    inactive?.setItem(false)
    active?.setItem(true)
    inactive?.groupContext?.inactiveGroup()
    active?.groupContext?.activeGroup()
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