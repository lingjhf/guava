import { createContext, useContext, Accessor, Setter, createSignal, createEffect } from 'solid-js'
import { GuavaParentProps } from '../types'
import styles from './list.module.css'
import { generateSplitEventHandlersProps, mergeClasses } from '../utils'

interface ListProviderValue {
  nav: Accessor<boolean>
  addItem: (item: Accessor<boolean>, setItem: Setter<boolean>) => number
  removeItem: (index: number) => void
  activeItem: (index: number) => void
}

export const ListContext = createContext<ListProviderValue>()
export const userListContext = () => useContext(ListContext)!

export interface ListProps extends GuavaParentProps<HTMLDivElement> {
  nav: boolean
}

export const List = (propsRaw: Partial<ListProps>) => {

  const [eventHandlers, props] = generateSplitEventHandlersProps(propsRaw, { nav: false })

  let index = 0
  const items = new Map<number, { item: Accessor<boolean>, setItem: Setter<boolean> }>()
  const [nav, setNav] = createSignal(props.nav)

  const listClasses = () => {
    const classes = [styles.list]
    if (nav()) {
      classes.push(styles.listNav)
    }
    return classes
  }

  createEffect(() => {
    setNav(props.nav)
  })

  function addItem(item: Accessor<boolean>, setItem: Setter<boolean>) {
    items.set(index, { item, setItem })
    return index++
  }

  function removeItem(index: number) {
    items.delete(index)
  }

  function activeItem(index: number) {
    for (const [i, { item, setItem }] of items.entries()) {
      if (i === index && !item()) {
        setItem(true)
      } else if (i !== index && item()) {
        setItem(false)
      }
    }
  }

  const providerValue = {
    nav,
    addItem,
    removeItem,
    activeItem
  }
  return (
    <ListContext.Provider value={providerValue}>
      <div class={mergeClasses(listClasses())}>
        {propsRaw.children}
      </div>
    </ListContext.Provider>
  )
}