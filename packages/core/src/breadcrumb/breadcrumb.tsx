import { createContext, useContext } from 'solid-js'
import type { ComponentPropsWithChildren, ValueChanged } from '../types'
import { generateProps, customEventHandlersName } from '../utils'
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
export interface BreadcrumbProps extends ComponentPropsWithChildren<HTMLDivElement> {
  size: 'default' | 'medium' | 'large'
  onSelected?: ValueChanged<BreadcrumbItemValue>
}

export const Breadcrumb = (propsRaw: Partial<BreadcrumbProps>) => {
  const [splitted, props] = generateProps(propsRaw, { size: 'default' }, customEventHandlersName)
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