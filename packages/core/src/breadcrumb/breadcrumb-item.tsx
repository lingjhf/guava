import type { GuavaParentProps } from '../types'
import { generateSplitEventHandlersProps } from '../utils'
import { useBreadcrumbContext } from './breadcrumb'

export type BreadcrumbItemValue = string | number

export interface BreadcrumbItemProps extends GuavaParentProps<HTMLDivElement> {
  value?: BreadcrumbItemValue
  disabled: boolean
}

export const BreadcrumbItem = (propsRaw: Partial<BreadcrumbItemProps>) => {
  const breadcrumbContext = useBreadcrumbContext()
  const [eventHandlers, props] = generateSplitEventHandlersProps(propsRaw, { disabled: false })

  const index = breadcrumbContext.registerItem()

  function onItemSelect() {
    const value = props.value ?? index
    breadcrumbContext.onSelected?.(value)
  }
  return (
    <div {...eventHandlers} ref={props.ref} onClick={onItemSelect}>{props.children}</div>
  )
}