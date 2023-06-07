import type { ComponentPropsWithChildren } from '../types'

export interface BreadcrumbItemProps extends ComponentPropsWithChildren<HTMLDivElement> {
  disabled: boolean
}

export const BreadcrumbItem = (propsRaw: Partial<BreadcrumbItemProps>) => {
  return (
    <div></div>
  )
}