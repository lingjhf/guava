import { createEffect, createSignal, on, onCleanup } from 'solid-js'
import type { GuavaParentProps } from '../types'
import type { ListValue } from './list'
import { useListContext } from './list'
import { generateSplitEventHandlersProps, mergeClasses } from '../utils'
import { useListGroupContext } from './list-group'
import styles from './list-item.module.css'
export interface ListItemProps extends GuavaParentProps<HTMLDivElement> {
  value?: ListValue
  defaultExpandActive: boolean
}

export const ListItem = (propsRaw: Partial<ListItemProps>) => {
  const [eventHandlers, props] = generateSplitEventHandlersProps(propsRaw, {
    defaultExpandActive: false
  })
  const listContext = useListContext()
  const listContextGroup = useListGroupContext()
  if (!listContext) {
    throw Error('list context is undefined')
  }
  const { nav, addItem, removeItem, activeItem } = listContext
  const [active, setActive] = createSignal(false)
  const itemKey = addItem({ item: active, setItem: setActive, groupContext: listContextGroup }, props.value)

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
      addItem({ item: active, setItem: setActive, groupContext: listContextGroup }, props.value)
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