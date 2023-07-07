import { createContext, useContext, type JSX } from 'solid-js'
import type { GuavaParentProps, ValueChanged } from '../types'
import { generateSplitEventHandlersProps } from '../utils'
import type { BreadcrumbItemValue } from './breadcrumb-item'
import styles from './breadcrumb.module.css'

export interface BreadcrumbProviderValue {
  registerItem: () => number
  onSelected?: ValueChanged<BreadcrumbItemValue>
}

const BreadcrumbContext = createContext<BreadcrumbProviderValue>()

export const useBreadcrumbContext = () => {
  const context = useContext(BreadcrumbContext)
  if (!context) {
    throw Error('BreadcrumbContext is undefined')
  }
  return context
}
export interface BreadcrumbProps extends GuavaParentProps<HTMLDivElement> {
  size: 'default' | 'medium' | 'large'
  separator?: JSX.Element
  onSelected?: ValueChanged<BreadcrumbItemValue>
}

export const Breadcrumb = (propsRaw: Partial<BreadcrumbProps>) => {
  const [splitted, props] = generateSplitEventHandlersProps(propsRaw, { size: 'default' })
  let index = 0
  const providerValue: BreadcrumbProviderValue = {
    registerItem,
    onSelected: props.onSelected
  }

  function registerItem(): number {
    return index++
  }
  return (
    <BreadcrumbContext.Provider value={providerValue}>
      <div class={styles.gBreadcrumb} {...splitted} ref={props.ref}>{props.children}</div>
    </BreadcrumbContext.Provider>
  )
}