import { createSignal } from 'solid-js'
import type { GuavaParentProps } from '../types'
import { generateSplitEventHandlersProps } from '../utils'
import { useFormContext } from './form'
import styles from './form-item.module.css'

export interface FormItemProps extends GuavaParentProps<HTMLDivElement> {
  label?: string
  name: string
}

export const FormItem = (propsRaw: Partial<FormItemProps>) => {

  const [eventHandlers, props] = generateSplitEventHandlersProps(propsRaw, {
    name: ''
  })

  const formContext = useFormContext()
  const [message, setMessage] = createSignal('')
  formContext?.addItem(props.name, setMessage)

  return (
    <div>
      <div></div>
      <div>{props.children}
        <div>{message()}</div>
      </div>
    </div>
  )
}