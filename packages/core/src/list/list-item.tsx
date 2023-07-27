import { Show, createEffect, createSignal, on, onCleanup } from 'solid-js'
import type { GuavaParentProps } from '../types'
import type { ListValue } from './list'
import { useListContext } from './list'
import { generateSplitEventHandlersProps, mergeClasses } from '../utils'
import { useListGroupContext } from './list-group'
import styles from './list-item.module.css'
export interface ListItemProps extends GuavaParentProps<HTMLDivElement> {
  value?: ListValue
  link?: string
  defaultExpandActive: boolean,
  level?: number
}

export const ListItem = (propsRaw: Partial<ListItemProps>) => {
  const [eventHandlers, props] = generateSplitEventHandlersProps(propsRaw, {
    defaultExpandActive: false
  })
  const listContext = useListContext()
  const listGroupContext = useListGroupContext()
  if (!listContext) {
    throw Error('list context is undefined')
  }
  const { nav, addItem, removeItem, activeItem } = listContext
  const [active, setActive] = createSignal(false)
  const itemKey = addItem({ item: active, setItem: setActive, groupContext: listGroupContext }, props.value)
  const level = props.level ?? (listGroupContext ? listGroupContext.level + 1 : 0)

  const itemClasses = () => {
    const classes = [styles.listItem]
    if (active()) {
      classes.push(styles.listItemActive)
    }
    if (nav()) {
      classes.push(styles.listItemNav)
    }
    return mergeClasses(classes)
  }

  const levelStyles = () => {
    return { 'padding-left': `${level * 32}px` }
  }

  createEffect(on(() => props.value, () => {
    if (props.value !== undefined && props.value !== itemKey) {
      removeItem(itemKey)
      addItem({ item: active, setItem: setActive, groupContext: listGroupContext }, props.value)
    }
  }))

  onCleanup(() => {
    removeItem(itemKey)
    listGroupContext?.removeItem(itemKey)
  })

  function selectedItem() {
    activeItem(itemKey)
  }
  return (
    <Show when={props.link} fallback={<div class={itemClasses()} style={levelStyles()} onClick={selectedItem}>{props.children}</div>}>
      <a href={props.link} class={itemClasses()} style={levelStyles()} onClick={selectedItem}>{props.children}</a>
    </Show>
  )
}