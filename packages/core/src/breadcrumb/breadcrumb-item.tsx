import { createEffect, createSignal, on, onCleanup } from 'solid-js'
import type { GuavaParentProps } from '../types'
import { generateSplitEventHandlersProps, mergeClasses } from '../utils'
import { useBreadcrumbContext, type BreadcrumbSize } from './breadcrumb'
import styles from './breadcrumb-item.module.css'

export type BreadcrumbItemValue = string | number

export interface BreadcrumbItemProps extends GuavaParentProps<HTMLDivElement> {
  value?: BreadcrumbItemValue
}

const sizeClasses: Record<BreadcrumbSize, string> = {
  'default': styles.breadcrumbItemDefault,
  'small': styles.breadcrumbItemSmall,
  'large': styles.breadcrumbItemLarge
}

export const BreadcrumbItem = (propsRaw: Partial<BreadcrumbItemProps>) => {
  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {}
  )
  const breadcrumbContext = useBreadcrumbContext()
  if (!breadcrumbContext) {
    throw Error('breadcrumb context is undefined')
  }

  const [active, setActive] = createSignal(false)
  const [showSeparator, setShowSeparator] = createSignal(false)
  let itemKey = breadcrumbContext.addItem({ item: active, setItem: setActive, showSeparator, setShowSeparator }, props.value)
  const itemClasses = () => {
    const classes = [styles.breadcrumbItem, sizeClasses[breadcrumbContext.size]]
    if (active()) {
      classes.push(styles.breadcrumbItemSelected)
    }
    return mergeClasses(classes)
  }

  createEffect(on(() => props.value, () => {
    if (props.value !== undefined && props.value !== itemKey) {
      breadcrumbContext.removeItem(itemKey)
      itemKey = breadcrumbContext.addItem({ item: active, setItem: setActive, showSeparator, setShowSeparator }, props.value)
    }
  }))

  onCleanup(() => {
    breadcrumbContext.removeItem(itemKey)
  })

  function clickActive() {
    breadcrumbContext!.activeItem(itemKey)
  }
  return (
    <div class={itemClasses()} onClick={clickActive}>
      {props.children}
    </div>
  )
}