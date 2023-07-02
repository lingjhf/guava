import { Show, createEffect, createSignal } from 'solid-js'
import { CheckFilled } from '../icon/check-filled'
import type { GuavaParentProps, ValueChanged } from '../types'
import { generateSplitEventHandlersProps } from '../utils'
import styles from './checkbox.module.css'

export interface CheckboxProps extends GuavaParentProps<HTMLDivElement> {
  size: number
  checked: boolean
  indeterminate: boolean
  disabled: boolean
  change?: ValueChanged<boolean>
}
export const Checkbox = (propsRaw: Partial<CheckboxProps>) => {
  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {
      size: 16,
      checked: false,
      indeterminate: false,
      disabled: false,
    },
  )

  const [checked, setChecked] = createSignal(false)

  createEffect(() => {
    setChecked(props.checked)
  })

  const checkStyles = () => {
    return `--checkbox-font-size:${props.size}px;${props.style}`
  }

  const checkClasses = () => {
    let classes = `${props.class} ${styles.gCheckbox}`
    if (props.disabled) {
      classes += ` ${styles.disabled}`
    }
    if (checked()) {
      classes += ` ${styles.gCheckboxChecked}`
      if (props.disabled) {
        return classes += ` ${styles.gCheckboxCheckedDisabled}`
      }
    } else if (props.indeterminate) {
      classes += ` ${styles.gCheckboxIndeterminateBorder}`
      if (props.disabled) {
        return classes += ` ${styles.gCheckboxIndeterminateBorderDisabled}`
      }
    }
    if (props.disabled) {
      return classes += ` ${styles.gCheckboxDisabled}`
    }
    return classes
  }

  const indeterminateClasses = () => {
    let classes = `${styles.gCheckboxIndeterminate}`
    if (props.disabled) {
      return classes += ` ${styles.gCheckboxIndeterminateDisabled}`
    }
    return classes
  }

  function checkedChange() {
    if (props.disabled) return
    const value = setChecked(!checked())
    props.change?.(value)
  }

  return (
    <div
      class={checkClasses()}
      classList={props.classList}
      style={checkStyles()}
      ref={props.ref}
      {...eventHandlers}
      onClick={checkedChange}
    >
      <Show when={checked()}>
        <CheckFilled class={styles.gCheckboxIcon} />
      </Show>
      <Show when={!checked() && props.indeterminate}>
        <div class={indeterminateClasses()}></div>
      </Show>
    </div>
  )
}