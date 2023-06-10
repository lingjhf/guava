import { Button, ButtonProps } from './button'
import styles from './text-button.module.css'

export const TextButton = (props: Partial<ButtonProps>) => {
  const buttonClasses = () => {
    let classes = `${styles.gTextButton}`
    if (props.disabled) {
      classes += ` ${styles.gTextButtonDisabled}`
    }
    if (props.class) {
      classes += ` ${props.class}`
    }
    return classes
  }
  return (
    <Button {...props} class={buttonClasses()} ></Button>
  )
}