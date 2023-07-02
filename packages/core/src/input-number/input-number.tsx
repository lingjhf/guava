import { createEffect, createSignal } from 'solid-js'
import { GInput, type InputSize } from '../input'
import { ChevronUpFilled } from '../icon/chevron-up-filled'
import { ChevronDownFilled } from '../icon/chevron-down-filled'
import { generateSplitEventHandlersProps, mergeClasses } from '../utils'
import type { GuavaInputEvent, GuavaProps } from '../types'
import styles from './input-number.module.css'

export interface InputNumberProps extends GuavaProps<HTMLInputElement> {
  value: number
  min: number
  max: number
  step: number
  size: InputSize
  placeholder?: string
  clearable: boolean
}

const sizeClasses: Record<InputSize, string> = {
  'default': styles.inputNumberSizeDefault,
  'small': styles.inputNumberSizeSmall,
  'large': styles.inputNumberSizeLarge
}

export const InputNumber = (propsRaw: Partial<InputNumberProps>) => {
  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {
      value: 0,
      min: Infinity,
      max: Infinity,
      step: 1,
      size: 'default',
      clearable: false
    }
  )

  const [inputValue, setInputValue] = createSignal<number>(0)

  createEffect(() => {
    if (isNaN(props.value)) {
      throw Error('value is NaN')
    }
  })

  const inputNumberClasses = () => {
    const s = [styles.inputNumber, sizeClasses[props.size]]
    return s
  }

  function setValidValue(value: number) {
    const hasMin = isFinite(props.min)
    const hasMax = isFinite(props.max)
    if (!hasMin && hasMax) {
      if (value <= props.max) {
        setInputValue(value)
      }
    } else if (hasMin && !hasMax) {
      if (value >= props.min) {
        setInputValue(value)
      }
    } else if (hasMin && hasMax) {
      if (value >= props.min && value <= props.max) {
        setInputValue(value)
      }
    } else {
      setInputValue(value)
    }
  }

  function input(value: string, e: GuavaInputEvent<InputEvent>) {
    const notNumber = isNaN(Number(value))
    const numberValue = notNumber ? value.replace(/\D+/, '') : value
    e.target.value = numberValue
    setValidValue(Number(numberValue))
  }

  function add() {
    setValidValue(inputValue() + props.step)
  }

  function subtract() {
    setValidValue(inputValue() - props.step)
  }

  return (
    <div class={mergeClasses(inputNumberClasses(), props.class)}>
      <div class={styles.inputNumberInputWrap}>
        <GInput value={`${inputValue()}`} input={input} />
      </div>
      <div class={styles.inputNumberStepWrap}>
        <div
          class={`${styles.inputNumberStep} ${styles.inputNumberAdd}`}
          onClick={add}>
          <ChevronUpFilled />
        </div>
        <div
          class={`${styles.inputNumberStep} ${styles.inputNumberSubtract}`}
          onClick={subtract}>
          <ChevronDownFilled />
        </div>
      </div>
    </div>
  )
}