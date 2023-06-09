import { ComponentPropsWithChildren } from '../types'
import { customEventHandlersName, generateProps } from '../utils'
import styles from './button.module.css'

export type ButtonSize = 'default' | 'small' | 'medium' | 'large'
export type ButtonType = 'default' | 'primary' | 'success' | 'warn' | 'danger' | 'info'
export interface ButtonProps extends ComponentPropsWithChildren<HTMLButtonElement> {
  size: ButtonSize,
  type: ButtonType,
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
  'default': styles.gButtonColorDefault,
  'primary': styles.gButtonColorPrimary,
  'success': styles.gButtonColorSuccess,
  'warn': styles.gButtonColorWarn,
  'danger': styles.gButtonColorDanger,
  'info': styles.gButtonColorInfo
}

const disabledTypeClasses: Record<ButtonType, string> = {
  'default': styles.gButtonColorDefaultDisabled,
  'primary': styles.gButtonColorPrimaryDisabled,
  'success': styles.gButtonColorSuccessDisabled,
  'warn': styles.gButtonColorWarnDisabled,
  'danger': styles.gButtonColorDangerDisabled,
  'info': styles.gButtonColorInfoDisabled
}

export const Button = (propsRaw: Partial<ButtonProps>) => {
  const [splitted, props] = generateProps(
    propsRaw,
    {
      size: 'default',
      type: 'default',
      rounded: false,
      disabled: false
    },
    customEventHandlersName,
  )

  const buttonClasses = () => {
    let classes = `${styles.gButton} ${sizeClasses[props.size]} ${typeClasses[props.type]}`
    if (props.rounded) {
      classes += ` ${styles.rounded}`
    }
    if (props.disabled) {
      classes += ` ${disabledTypeClasses[props.type]}`
    }

    return classes
  }

  return (
    <button class={buttonClasses()} {...splitted} ref={props.ref}>{props.children}</button>
  )
}