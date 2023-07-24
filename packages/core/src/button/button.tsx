import type { GuavaParentProps } from '../types'
import { generateSplitEventHandlersProps, mergeClasses } from '../utils'
import styles from './button.module.css'

export type ButtonSize = 'default' | 'small' | 'medium' | 'large'
export type ButtonType = 'default' | 'primary' | 'success' | 'warn' | 'danger'
export interface ButtonProps extends GuavaParentProps<HTMLButtonElement> {
  size: ButtonSize
  type: ButtonType
  rounded: boolean
  disabled: boolean
  icon: boolean
  variant?: 'text' | 'jelly'
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

const textTypeClasses: Record<ButtonType, string> = {
  'default': styles.textButtonDefault,
  'primary': styles.textButtonPrimary,
  'success': styles.textButtonSuccess,
  'warn': styles.textButtonWarn,
  'danger': styles.textButtonDanger,
}

const iconSizeClasses: Record<ButtonSize, string> = {
  'default': styles.iconButtonSizeDefault,
  'small': styles.iconButtonSizeSmall,
  'medium': styles.iconButtonSizeMedium,
  'large': styles.iconButtonSizeLarge
}

export const Button = (propsRaw: Partial<ButtonProps>) => {
  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {
      size: 'default',
      type: 'default',
      rounded: false,
      disabled: false,
      icon: false,
    },
  )

  const buttonClasses = () => {
    const classes = [styles.button, sizeClasses[props.size]]
    if (props.icon) {
      classes.push(iconSizeClasses[props.size])
    } else {
      classes.push(sizeClasses[props.size])
    }
    if (props.rounded) {
      classes.push(styles.rounded)
    }
    switch (props.variant) {
      case 'jelly':
        classes.push(jellyTypeClasses[props.type])
        if (props.disabled) {
          classes.push(jellyDisabledClasses[props.type])
        }
        break
      case 'text':
        classes.push(textTypeClasses[props.type])
        if (props.disabled) {
          classes.push(styles.textButtonDisabled)
        }
        break
      default:
        classes.push(typeClasses[props.type])
        if (props.disabled) {
          classes.push(typeDisabledClasses[props.type])
        }
    }
    return mergeClasses(classes, props.class)
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