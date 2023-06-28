import { GuavaProps } from '../types'
import { generateSplitEventHandlersProps } from '../utils'

export interface CascaderProps extends GuavaProps<HTMLDivElement> {
  clearable: boolean
  disabled: boolean
  placeholder: string
}

export const Cascader = (propsRaw: Partial<CascaderProps>) => {
  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {
      clearable: false,
      disabled: false,
      placeholder: '',
    },
  )
  return (
    <div></div>
  )
}