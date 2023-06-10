import { ComponentPropsWithChildren } from '../types'
import { customEventHandlersName, generateProps } from '../utils'
import styles from './button.module.css'

export type ButtonSize = 'default' | 'small' | 'medium' | 'large'
export type ButtonType = 'default' | 'primary' | 'success' | 'warn' | 'danger'
export interface ButtonProps extends ComponentPropsWithChildren<HTMLButtonElement> {
  size: ButtonSize,
  type: ButtonType,
  jelly: boolean,
  rounded: boolean
  disabled: boolean
}

const sizeClasses: Record<ButtonSize, string> = {
  'default': styles.gButtonSizeDefault,
  'small': styles.gButtonSizeSmall,
  'medium': styles.gButtonSizeMedium,
  'large': styles.gButtonSizeLarge
}

const typeClasses: Record<ButtonType, string> = {
  'default': styles.gButtonDefault,
  'primary': styles.gButtonPrimary,
  'success': styles.gButtonSuccess,
  'warn': styles.gButtonWarn,
  'danger': styles.gButtonDanger,
}

const typeDisabledClasses: Record<ButtonType, string> = {
  'default': styles.gButtonDefaultDisabled,
  'primary': styles.gButtonPrimaryDisabled,
  'success': styles.gButtonSuccessDisabled,
  'warn': styles.gButtonWarnDisabled,
  'danger': styles.gButtonDangerDisabled,
}

const jellyTypeClasses: Record<ButtonType, string> = {
  'default': styles.gButtonJellyDefault,
  'primary': styles.gButtonJellyPrimary,
  'success': styles.gButtonJellySuccess,
  'warn': styles.gButtonJellyWarn,
  'danger': styles.gButtonJellyDanger,
}

const jellyDisabledClasses: Record<ButtonType, string> = {
  'default': styles.gButtonJellyDefaultDisabled,
  'primary': styles.gButtonJellyPrimaryDisabled,
  'success': styles.gButtonJellySuccessDisabled,
  'warn': styles.gButtonJellyWarnDisabled,
  'danger': styles.gButtonJellyDangerDisabled,
}

export const Button = (propsRaw: Partial<ButtonProps>) => {
  const [eventHandlers, props] = generateProps(
    propsRaw,
    {
      size: 'default',
      type: 'default',
      jelly: false,
      rounded: false,
      disabled: false
    },
    customEventHandlersName,
  )

  const buttonClasses = () => {
    let classes = `${styles.gButton} ${sizeClasses[props.size]}`
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