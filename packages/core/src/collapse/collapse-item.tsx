import { Show, type JSX, createSignal, createEffect, on } from 'solid-js'
import type { GuavaParentProps } from '../types'
import { generateSplitEventHandlersProps, mergeClasses } from '../utils'
import { useCollapseContext } from './collapse'
import { ChevronRightFilled } from '../icon/chevron-right-filled'
import { ChevronDownFilled } from '../icon/chevron-down-filled'
import styles from './collapse-item.module.css'

export interface CollapseItemProps extends GuavaParentProps<HTMLDivElement> {
  header?: JSX.Element
  value?: string
}

export const CollapseItem = (propsRaw: Partial<CollapseItemProps>) => {

  const [eventHandlers, props] = generateSplitEventHandlersProps(propsRaw, {})
  const collapseContext = useCollapseContext()
  if (!collapseContext) {
    throw Error('collapse context is undefined')
  }

  const [expand, setExpand] = createSignal(false)
  const itemKey = collapseContext.addItem({ item: expand, setItem: setExpand }, props.value)

  const itemContentClasses = () => {
    const classes = [styles.collapseItemContent]
    if (expand()) {
      classes.push(styles.collapseItemContentExpand)
    } else {
      classes.push(styles.collapseItemContentFold)
    }
    return mergeClasses(classes)
  }

  createEffect(on(() => props.value, () => {
    if (props.value !== undefined && props.value !== itemKey) {
      collapseContext.removeItem(itemKey)
      collapseContext.addItem({ item: expand, setItem: setExpand }, props.value)
    }
  }))

  function clickExpand() {
    collapseContext?.activeItem(itemKey)
  }

  return (
    <div class={styles.collapseItem}>
      <div class={styles.collapseItemHeader} onClick={clickExpand}>
        <div class={styles.collapseItemHeaderTitle}>
          {props.header}
        </div>
        <div class={styles.collapseItemHeaderTrigger} >
          <Show when={expand()} fallback={<ChevronRightFilled />}>
            <ChevronDownFilled />
          </Show>
        </div>
      </div>
      <div class={itemContentClasses()}>
        {props.children}
      </div>
    </div>
  )
}