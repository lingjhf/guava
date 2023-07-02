import { createSignal } from 'solid-js'
import type { GuavaProps } from '../types'
import styles from './switch.module.css'
import { generateSplitEventHandlersProps } from '../utils'

export type SwitchType = 'default' | 'small' | 'large'
export interface SwitchProps extends GuavaProps<HTMLDivElement> {
  off: boolean
  size: SwitchType,
  loading: boolean | (() => Promise<unknown>)
  disabled: boolean
}

const sizeClasses = {
  default: styles.switchDefaultSize,
  small: styles.switchSmall,
  large: styles.switchLarge,
}

const actionSizeClasses = {
  default: styles.switchActionDefaultSize,
  small: styles.switchActionSmall,
  large: styles.switchActionLarge,
}

export const Switch = (propsRaw: Partial<SwitchProps>) => {

  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {
      off: true,
      size: 'default',
      loading: false,
      disabled: false
    },
  )

  const [off, setOffset] = createSignal(true)

  const switchClasses = () => {
    let classes = ` ${styles.switch} ${sizeClasses[props.size]}`
    if (off()) {
      classes += ` ${styles.switchOff}`
    } else {
      classes += ` ${styles.switchOn}`
    }
    return classes
  }

  const switchActionClasses = () => {
    let classes = ` ${styles.switchAction} ${actionSizeClasses[props.size]}`
    if (off()) {
      classes += ` ${styles.switchActionOff}`
    } else {
      classes += ` ${styles.switchActionOn}`
    }
    return classes
  }

  async function switchChange() {
    if (typeof props.loading === 'function') {
      await props.loading()
    }
    setOffset(v => !v)
  }

  return (
    <div class={switchClasses()} {...eventHandlers} onClick={switchChange} >
      <div class={switchActionClasses()}></div>
    </div>
  )
}