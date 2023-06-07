import { mergeProps, splitProps } from 'solid-js'
import type { ComponentPropsWithChildren, ValueChanged } from '../types'
import { generateProps, customEventHandlersName } from '../utils'

export interface BreadcrumbProps extends ComponentPropsWithChildren<HTMLDivElement> {
  size: 'default' | 'medium' | 'large'
  select?: ValueChanged<unknown>
}

export const Breadcrumb = (propsRaw: Partial<BreadcrumbProps>) => {
  const [split, props] = generateProps<BreadcrumbProps>(propsRaw, { size: 'default' }, [customEventHandlersName])
  return (
    <div></div>
  )
}