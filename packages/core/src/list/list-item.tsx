import { createEffect, createSignal, onCleanup } from 'solid-js'
import { GuavaParentProps } from '../types'
import { useListContext } from './list'
import styles from './list-item.module.css'
import { generateSplitEventHandlersProps, mergeClasses } from '../utils'

export interface ListItemProps extends GuavaParentProps<HTMLDivElement> {
  items: []
}

export const ListItem = (propsRaw: Partial<ListItemProps>) => {
  const [eventHandlers, props] = generateSplitEventHandlersProps(propsRaw, { items: [] })
  const { nav, addItem, removeItem, activeItem } = useListContext()
  const [selected, setSelected] = createSignal(false)
  const index = addItem(selected, setSelected)

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

  onCleanup(() => {
    removeItem(index)
  })

  function selectedItem() {
    activeItem(index)
  }
  return (
    <div class={mergeClasses(itemClasses())} onClick={selectedItem}>{props.children}</div>
  )
}