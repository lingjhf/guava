import { createEffect, createSignal, on, onCleanup } from 'solid-js'
import type { GuavaParentProps } from '../types'
import type { ListValue } from './list'
import { useListContext } from './list'
import styles from './list-item.module.css'
import { generateSplitEventHandlersProps, mergeClasses } from '../utils'
import { useListGroupContext } from './list-group'

export interface ListItemProps extends GuavaParentProps<HTMLDivElement> {
  value?: ListValue
}

export const ListItem = (propsRaw: Partial<ListItemProps>) => {
  const [eventHandlers, props] = generateSplitEventHandlersProps(propsRaw, {})
  const listContext = useListContext()
  const listContextGroup = useListGroupContext()
  if (!listContext) {
    throw Error('list context is undefined')
  }
  const { nav, addItem, removeItem, activeItem } = listContext
  const [active, setActive] = createSignal(false)
  const itemKey = addItem(active, setActive, props.value)

  const itemClasses = () => {
    const classes = [styles.listItem]
    if (active()) {
      classes.push(styles.listItemActive)
    }
    if (nav()) {
      classes.push(styles.listItemNav)
    }
    return classes
  }

  const levelStyles = () => {
    if (listContextGroup?.level) {
      return { 'padding-left': `${listContextGroup.level * 32}px` }
    }
  }

  createEffect(on(() => props.value, () => {
    if (props.value !== undefined && props.value !== itemKey) {
      removeItem(itemKey)
      addItem(active, setActive, props.value)
    }
  }))

  createEffect(on(active, (value) => {
    if (value) {
      listContextGroup?.activeGroup()
    } else {
      listContextGroup?.inactiveGroup()
    }
  }))

  onCleanup(() => {
    removeItem(itemKey)
    listContextGroup?.removeItem(itemKey)
  })

  function selectedItem() {
    activeItem(itemKey)
  }
  return (
    <div class={mergeClasses(itemClasses())} style={levelStyles()} onClick={selectedItem}>{props.children}</div>
  )
}