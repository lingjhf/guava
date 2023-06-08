import type { ComponentPropsWithChildren } from '../types'
import { generateProps, customEventHandlersName } from '../utils'
import { useBreadcrumbContext } from './breadcrumb'

export type BreadcrumbItemValue = string | number

export interface BreadcrumbItemProps extends ComponentPropsWithChildren<HTMLDivElement> {
  value?: BreadcrumbItemValue
  disabled: boolean
}

export const BreadcrumbItem = (propsRaw: Partial<BreadcrumbItemProps>) => {
  const breadcrumbContext = useBreadcrumbContext()
  const [splitted, props] = generateProps(propsRaw, { disabled: false }, customEventHandlersName)

  const index = breadcrumbContext.registerItem()

  function onItemSelect() {
    const value = props.value ?? index
    breadcrumbContext.onSelected?.(value)
  }
  return (
    <div {...splitted} ref={props.ref} onClick={onItemSelect}>{props.children}</div>
  )
}