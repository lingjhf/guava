import type { GuavaParentProps } from '../types'
import { generateSplitEventHandlersProps } from '../utils'
import styles from './button.module.css'

export type ButtonSize = 'default' | 'small' | 'medium' | 'large'
export type ButtonType = 'default' | 'primary' | 'success' | 'warn' | 'danger'
export interface ButtonProps extends GuavaParentProps<HTMLButtonElement> {
  size: ButtonSize,
  type: ButtonType,
  jelly: boolean,
  rounded: boolean
  disabled: boolean
}

const sizeClasses: Record<ButtonSize, string> = {
  'default': styles.buttonSizeDefault,
  'small': styles.buttonSizeSmall,
  'medium': styles.buttonSizeMedium,
  'large': styles.buttonSizeLarge
}

const typeClasses: Record<ButtonType, string> = {
  'default': styles.buttonDefault,
  'primary': styles.buttonPrimary,
  'success': styles.buttonSuccess,
  'warn': styles.buttonWarn,
  'danger': styles.buttonDanger,
}

const typeDisabledClasses: Record<ButtonType, string> = {
  'default': styles.buttonDefaultDisabled,
  'primary': styles.buttonPrimaryDisabled,
  'success': styles.buttonSuccessDisabled,
  'warn': styles.buttonWarnDisabled,
  'danger': styles.buttonDangerDisabled,
}

const jellyTypeClasses: Record<ButtonType, string> = {
  'default': styles.buttonJellyDefault,
  'primary': styles.buttonJellyPrimary,
  'success': styles.buttonJellySuccess,
  'warn': styles.buttonJellyWarn,
  'danger': styles.buttonJellyDanger,
}

const jellyDisabledClasses: Record<ButtonType, string> = {
  'default': styles.buttonJellyDefaultDisabled,
  'primary': styles.buttonJellyPrimaryDisabled,
  'success': styles.buttonJellySuccessDisabled,
  'warn': styles.buttonJellyWarnDisabled,
  'danger': styles.buttonJellyDangerDisabled,
}

export const Button = (propsRaw: Partial<ButtonProps>) => {
  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {
      size: 'default',
      type: 'default',
      jelly: false,
      rounded: false,
      disabled: false
    },
  )

  const buttonClasses = () => {
    let classes = `${styles.button} ${sizeClasses[props.size]}`
    if (props.rounded) {
      classes += ` ${styles.rounded}`
    }
    if (props.jelly) {
      classes += ` ${jellyTypeClasses[props.type]}`
      if (props.disabled) {
        classes += ` ${jellyDisabledClasses[props.type]}`
      }
    } else {
      classes += ` ${typeClasses[props.type]}`
      if (props.disabled) {
        classes += ` ${typeDisabledClasses[props.type]}`
      }
    }
    if (props.class) {
      classes += ` ${props.class}`
    }
    return classes
  }

  return (
    <button
      class={buttonClasses()}
      classList={props.classList}
      style={props.style}
      ref={props.ref}
      disabled={props.disabled}
      {...eventHandlers}
    >
      {props.children}
    </button>
  )
}