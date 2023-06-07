import type { JSX } from 'solid-js'
import { mergeProps, splitProps } from 'solid-js'
import { CustomEventHandlersName } from '../utils/constants'
import type { ComponentPropsWithChildren } from '../utils/types'
import styles from './button.module.css'

export type ButotnSize = 'default' | 'small' | 'medium' | 'large'
export type ButtonColor = 'default' | 'primary' | 'success' | 'warn' | 'danger'

export interface GButtonProps extends ComponentPropsWithChildren<HTMLButtonElement> {
  size: ButotnSize
  color: ButtonColor
  background: boolean
  round: boolean
  circle: boolean
}

export const GButton = (propsRaw: Partial<GButtonProps>) => {
  const [splitted, props] = splitProps(
    mergeProps<[GButtonProps, ...Partial<GButtonProps>[]]>(
      {
        size: 'default',
        color: 'default',
        background: false,
        round: false,
        circle: false
      },
      propsRaw,
    ),
    CustomEventHandlersName,
  )

  return (
    <button
      class='g-button'
      classList={{
        'is-background': props.background,
        'is-round': props.round,
        'is-circle': props.circle
      }}
      ref={props.ref}
      {...splitted}
    >
      {props.children}
    </button>
  )
}