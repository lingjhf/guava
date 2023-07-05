import { createEffect, createSignal, onCleanup } from 'solid-js'
import type { GuavaParentProps } from '../types'
import type { ListValue } from './list'
import { useListContext } from './list'
import styles from './list-item.module.css'
import { generateSplitEventHandlersProps, mergeClasses } from '../utils'

export interface ListItemProps extends GuavaParentProps<HTMLDivElement> {
  value?: ListValue
}

export const ListItem = (propsRaw: Partial<ListItemProps>) => {
  const [eventHandlers, props] = generateSplitEventHandlersProps(propsRaw, {})
  const listContext = useListContext()
  if (!listContext) {
    throw Error('list context is undefined')
  }
  const { nav, addItem, removeItem, activeItem } = listContext
  const [selected, setSelected] = createSignal(false)
  const itemKey = addItem(selected, setSelected, props.value)

  const itemClasses = () => {
    const classes = [styles.listItem]
    if (selected()) {
      classes.push(styles.listItemSelected)
    }
    if (nav()) {
      classes.push(styles.listItemNav)
    }
    return classes
  }

  createEffect(() => {
    if (props.value !== undefined && props.value !== itemKey) {
      removeItem(itemKey)
      addItem(selected, setSelected, props.value)
    }
  })

  onCleanup(() => {
    removeItem(itemKey)
  })

  function selectedItem() {
    activeItem(itemKey)
  }
  return (
    <div class={mergeClasses(itemClasses())} onClick={selectedItem}>{props.children}</div>
  )
}