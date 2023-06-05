import type { JSX } from 'solid-js'
import { mergeProps, splitProps } from 'solid-js'
import { CustomEventHandlersName } from '../constants'
import './styles.css'

export interface GButtonProps extends JSX.CustomEventHandlersCamelCase<HTMLButtonElement> {
  text: boolean
  background: boolean
  round: boolean
  circle: boolean
  ref?: HTMLButtonElement
  children?: JSX.Element | JSX.Element[]
}

export const GButton = (props: Partial<GButtonProps>) => {
  const [splitted, defaultProps] = splitProps(mergeProps<[GButtonProps, ...Partial<GButtonProps>[]]>(
    {
      text: false,
      background: false,
      round: false,
      circle: false
    },
    props,
  ),
    CustomEventHandlersName,
  )

  return (
    <button
      class='g-button'
      classList={{
        'is-text': defaultProps.text,
        'is-background': defaultProps.background,
        'is-round': defaultProps.round,
        'is-circle': defaultProps.circle
      }}
      ref={defaultProps.ref}
      {...splitted}
    >
      {defaultProps.children}
    </button>
  )
}