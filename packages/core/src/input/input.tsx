import type { JSX } from 'solid-js'
import { Show, createEffect, createSignal } from 'solid-js'
import { CloseCircleFilled } from '../icon/close-circle-filled'
import { ComponentPropsWithChildren, ValueChanged } from '../types'
import { customEventHandlersName, generateProps } from '../utils'
import styles from './input.module.css'

export type InputSize = 'default' | 'small' | 'large'
export interface InputProps extends ComponentPropsWithChildren<HTMLInputElement> {
  value: string
  placeholder?: string
  clearable: boolean
  size: InputSize,
  prepend?: JSX.Element
  append?: JSX.Element
  prefix?: JSX.Element
  suffix?: JSX.Element
  input?: ValueChanged<string>
  change?: ValueChanged<string>
  focusIn?: ValueChanged<FocusEvent>
  focusOut?: ValueChanged<FocusEvent>
}

const sizeClasses: Record<InputSize, string> = {
  'default': styles.gInputSizeDefault,
  'small': styles.gInputSizeSmall,
  'large': styles.gInputSizeLarge
}

export const Input = (propsRaw: Partial<InputProps>) => {
  const [eventHandlers, props] = generateProps(
    propsRaw,
    {
      value: '',
      clearable: false,
      size: 'default'
    },
    customEventHandlersName
  )
  const [inputValue, setInputValue] = createSignal('')
  const [isHover, setIsHover] = createSignal(false)
  const [isFocus, setIsFocus] = createSignal(false)

  createEffect(() => {
    setInputValue(props.value)
  })

  const inputClasses = () => {
    let classes = `${styles.gInput} ${sizeClasses[props.size]}`
    if (isFocus()) {
      classes += ` ${styles.gInputFocus}`
    }
    return classes
  }

  function input(e: InputEvent) {
    const target = e.target as HTMLInputElement
    setInputValue(target.value)
    props.input?.(target.value)
    change(target.value)
  }

  function focusIn(e: FocusEvent) {
    setIsFocus(true)
    props.focusIn?.(e)
  }

  function focusOut(e: FocusEvent) {
    setIsFocus(false)
    props.focusOut?.(e)
  }

  function mouseEnter() {
    setIsHover(true)
  }

  function mouseLeave() {
    setIsHover(false)
  }

  function clear() {
    setInputValue('')
    change('')
  }

  function change(value: string) {
    props.change?.(value)
  }

  return (
    <div class={inputClasses()}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <input
        class={styles.gInputText}
        value={inputValue()}
        placeholder={props.placeholder}
        ref={props.ref}
        {...eventHandlers}
        onInput={input}
        onFocusIn={focusIn}
        onFocusOut={focusOut}
      ></input>
      <Show when={props.clearable}>
        <div class={styles.gInputClearable}>
          <Show when={inputValue() && (isHover() || isFocus())}>
            <CloseCircleFilled class={styles.gInputClearableIcon} onClick={clear} />
          </Show>
        </div>
      </Show>
    </div>
  )
}