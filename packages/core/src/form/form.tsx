import { createContext, useContext, type Accessor, type Setter, createEffect, on, createSignal } from 'solid-js'
import type { GuavaParentProps } from '../types'
import { generateSplitEventHandlersProps } from '../utils'
import { FormValidator, type FormValidated } from './validator'
import styles from './form.module.css'
import * as yup from 'yup'

interface ItemMapValue {
  setMessage: Setter<string>
  setValidated: Setter<boolean>
}

export interface FormProviderValue {
  labelWidth: Accessor<string>
  labelPosition: Accessor<FormProps['labelPosition']>
  labelAlign: Accessor<FormProps['labelAlign']>
  addItem: (name: string, value: ItemMapValue) => void
}

const FormContext = createContext<FormProviderValue>()

export const useFormContext = () => useContext(FormContext)

export interface FormProps extends GuavaParentProps<HTMLDivElement> {
  form?: any
  validator?: FormValidator
  labelWidth: string
  labelPosition: 'left' | 'top'
  labelAlign: 'left' | 'center' | 'right'
}

export const Form = (propsRaw: Partial<FormProps>) => {

  const [eventHandlers, props] = generateSplitEventHandlersProps(propsRaw, {
    labelWidth: '100px',
    labelPosition: 'left',
    labelAlign: 'right'
  })

  props.validator?.setForm(props.form, false)
  props.validator?.addVdalidateListener(validate)
  props.validator?.addClearVdalidateListener(clearValidated)

  const itemsMap = new Map<string, ItemMapValue>()
  const [labelWidth, setLabelWidth] = createSignal('')
  const [labelPosition, setLabelPosition] = createSignal<FormProps['labelPosition']>('left')
  const [labelAlign, setLabelAlign] = createSignal<FormProps['labelAlign']>('right')

  createEffect(
    on(
      () => props.form,
      () => {
        props.validator?.setForm(props.form)
      },
      { defer: true }
    )
  )

  createEffect(on(() => props.labelWidth, (value) => {
    setLabelWidth(value)
  }))

  createEffect(on(() => props.labelPosition, (value) => {
    setLabelPosition(value)
  }))

  createEffect(on(() => props.labelAlign, (value) => {
    setLabelAlign(value)
  }))

  function validate(valided: FormValidated) {
    let errors = {}
    for (const error of valided.error?.errors ?? []) {
      if (typeof error === 'object') {
        errors = { ...errors, ...error as object }
      }
    }
    for (const [key, value] of itemsMap.entries()) {
      if (key in errors) {
        value.setMessage(errors[key])
        value.setValidated(true)
      } else {
        value.setMessage('')
        value.setValidated(false)
      }
    }
  }

  function clearValidated() {
    for (const value of itemsMap.values()) {
      value.setMessage('')
      value.setValidated(false)
    }
  }

  function addItem(name: string, value: ItemMapValue) {
    itemsMap.set(name, value)
  }

  const providerValue: FormProviderValue = {
    labelWidth,
    labelPosition,
    labelAlign,
    addItem
  }

  return (
    <FormContext.Provider value={providerValue}>
      <div class={styles.form}>
        {propsRaw.children}
      </div>
    </FormContext.Provider>
  )
}