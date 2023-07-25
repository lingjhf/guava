import { Show, createContext, createSignal, useContext, type JSX } from 'solid-js'
import type { GuavaParentProps } from '../types'
import { generateSplitEventHandlersProps, mergeClasses, mergeStyles } from '../utils'
import { useFormContext } from './form'
import styles from './form-item.module.css'

const FormItemContext = createContext()

export const useFormItemContext = () => useContext(FormItemContext)

export interface FormItemProps extends GuavaParentProps<HTMLDivElement> {
  label?: JSX.Element
  required: boolean
  name: string
}

export const FormItem = (propsRaw: Partial<FormItemProps>) => {

  const [eventHandlers, props] = generateSplitEventHandlersProps(propsRaw, {
    name: '',
    required: false,
  })

  const formContext = useFormContext()
  const [message, setMessage] = createSignal('')
  const [validated, setValidated] = createSignal(false)
  formContext?.addItem(props.name, { setMessage, setValidated })

  const formClasses = () => {
    const classes = [styles.formItem]
    if (validated()) {
      classes.push(styles.formItemMessageDanger)
    }

    return mergeClasses(classes, props.class)
  }

  const wrapClasses = () => {
    const classes = [styles.formItemWrap]
    if (formContext?.labelPosition() === 'top') {
      classes.push(styles.formItemWrapTop)
    }
    return mergeClasses(classes)
  }

  const labelClasses = () => {
    const labelAlignClasses = {
      'left': styles.formItemLabelLeft,
      'center': styles.formItemLabelCenter,
      'right': styles.formItemLabelRight,
    }
    const classes = [styles.formItemLabel, labelAlignClasses[formContext?.labelAlign() ?? 'right']]
    if (formContext?.labelPosition() === 'top') {
      classes.push(styles.formItemLabelTop)
    }
    return mergeClasses(classes)
  }

  return (
    <div class={formClasses()} >
      <div class={wrapClasses()}>
        <div class={labelClasses()} style={`width:${formContext?.labelWidth()};`}>
          <Show when={props.required}>
            <span class={styles.formLabelRequired}>*</span>
          </Show>
          {props.label}
        </div>
        <div class={styles.formItemMessageWrap}>
          {props.children}
          <div class={styles.formItemMessage}>{message()}</div>
        </div>
      </div>
    </div>
  )
}