import { ComponentProps } from '../types'
import { customEventHandlersName, generateProps } from '../utils'
import { CloseCircleFilled } from '../icon/close-circle-filled'

export interface CascaderProps extends ComponentProps<HTMLDivElement> {
  clearable: boolean
  disabled: boolean
  placeholder: string
}

export const Cascader = (propsRaw: Partial<CascaderProps>) => {
  const [eventHandlers, props] = generateProps(
    propsRaw,
    {
      clearable: false,
      disabled: false,
      placeholder: '',
    },
    customEventHandlersName
  )
  return (
    <div></div>
  )
}