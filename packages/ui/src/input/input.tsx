import { JSX, mergeProps } from 'solid-js'
import { createSignal, Show } from 'solid-js'
import type { ValueChanged } from '../types'
import './styles.css'

export interface GInputProps {
  type: string
  value: string | number
  name?: string
  placeholder?: string
  prepend?: JSX.Element
  append?: JSX.Element
  prefix?: JSX.Element
  suffix?: JSX.Element
  blur?: ValueChanged<FocusEvent>
  focus?: ValueChanged<FocusEvent>
  focusIn?: ValueChanged<FocusEvent>
  focusOut?: ValueChanged<FocusEvent>
  input?: ValueChanged<string | number>
  change?: ValueChanged<string | number>
  ref?: HTMLInputElement | ((el: HTMLInputElement) => void) | undefined
}

export const GInput = (props: Partial<GInputProps>) => {
  const defaultProps = mergeProps<[GInputProps, ...Partial<GInputProps>[]]>(
    {
      value: '',
      type: 'text',
    },
    props
  )

  const [isFocus, setIsFocus] = createSignal(false)
  const [isHover, setIshover] = createSignal(false)

  function onFocusIn(e: FocusEvent) {
    setIsFocus(true)
    defaultProps.focusIn?.(e)
  }

  function onFocusOut(e: FocusEvent) {
    setIsFocus(false)
    defaultProps.focusOut?.(e)
  }

  function onEnter() {
    setIshover(true)
  }

  function onLeave() {
    setIshover(false)
  }

  return (
    <div class='e-input' classList={{ 'e-input-group--prepend': !!defaultProps.prepend, 'e-input-group--append': !!defaultProps.append }}>
      <Show when={defaultProps.prepend}>
        <div class='e-input__prepend' classList={{ 'is-focus': isFocus(), 'is-hover': isHover() }}>
          {defaultProps.prepend}
        </div>
      </Show>
      <div class='e-input__wrapper' classList={{ 'is-focus': isFocus() }}>
        <Show when={defaultProps.prefix}>
          <div class='e-input__prefix'>
            {defaultProps.prefix}
          </div>
        </Show>
        <input
          class='e-input__inner'
          ref={props.ref}
          type={defaultProps.type}
          value={defaultProps.value}
          name={defaultProps.name}
          placeholder={defaultProps.placeholder}
          onBlur={defaultProps.blur}
          onFocus={defaultProps.focus}
          onFocusIn={onFocusIn}
          onFocusOut={onFocusOut}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        />
        <Show when={defaultProps.suffix}>
          <div class='e-input__suffix'>
            {defaultProps.suffix}
          </div>
        </Show>
      </div>
      <Show when={defaultProps.append}>
        <div class='e-input__append' classList={{ 'is-focus': isFocus(), 'is-hover': isHover() }}>
          {defaultProps.append}
        </div>
      </Show>
    </div >
  )
}
