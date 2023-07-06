import type { Accessor, JSX, Setter } from 'solid-js'
import { createContext, useContext, createSignal, createEffect, Show } from 'solid-js'
import type { GuavaParentProps } from '../types'
import type { ListValue } from './list'
import { useListContext } from './list'
import { generateSplitEventHandlersProps, mergeClasses } from '../utils'
import { ChevronUpFilled } from '../icon/chevron-up-filled'
import { ChevronDownFilled } from '../icon/chevron-down-filled'
import styles from './list-group.module.css'

interface ListGroupProviderValue {
  addItem: (item: Accessor<boolean>, key: ListValue) => void
  removeItem: (itemKey: ListValue) => void
  activeGroup: () => void
  inactiveGroup: () => void
}

export const ListGroupContext = createContext<ListGroupProviderValue>()
export const useListGroupContext = () => useContext(ListGroupContext)

export interface ListGroupProps extends GuavaParentProps<HTMLDivElement> {
  value?: ListValue
  level?: number
  header?: JSX.Element
}

export const ListGroup = (propsRaw: Partial<ListGroupProps>) => {

  const [eventHandlers, props] = generateSplitEventHandlersProps(propsRaw, {})
  const listContext = useListContext()
  const listGroupContext = useListGroupContext()
  if (!listContext) {
    throw Error('list context is undefined')
  }
  const items = new Map<ListValue, { item: Accessor<boolean> }>()
  const [expand, setExpand] = createSignal(false)
  const [active, setActive] = createSignal(false)

  const groupHeaderClasses = () => {
    const classes = [styles.listGroupHeader]
    if (active()) {
      classes.push(styles.listGroupHeaderActive)
    }
    if (listContext.nav()) {
      classes.push(styles.listGroupHeaderNav)
    }
    return mergeClasses(classes)
  }

  const groupChildrenClasses = () => {
    const classes: string[] = []
    if (!expand()) {
      classes.push(styles.listGroupChildren)
    } else {
      classes.push(styles.listGroupChildrenExpand)
    }
    return mergeClasses(classes)
  }

  function addItem(item: Accessor<boolean>, key: ListValue) {
    items.set(key, { item })
    listGroupContext?.addItem(item, key)
  }

  function removeItem(itemKey: ListValue) {
    items.delete(itemKey)
    listGroupContext?.removeItem(itemKey)
  }

  function activeGroup() {
    setActive(true)
    listGroupContext?.activeGroup()
  }

  function inactiveGroup() {
    setActive(false)
    listGroupContext?.inactiveGroup()
  }

  function expandGroup() {
    setExpand(v => !v)
  }

  const providerValue = {
    addItem,
    removeItem,
    activeGroup,
    inactiveGroup,
  }
  return (
    <ListGroupContext.Provider value={providerValue}>
      <div >
        <div class={groupHeaderClasses()} onClick={expandGroup}>
          {props.header}
          <Show when={expand()} fallback={<ChevronDownFilled class={styles.listGroupHeaderIcon} />}>
            <ChevronUpFilled class={styles.listGroupHeaderIcon} />
          </Show>
        </div>
        <div class={groupChildrenClasses()}>
          {props.children}
        </div>
      </div>
    </ListGroupContext.Provider>
  )
}